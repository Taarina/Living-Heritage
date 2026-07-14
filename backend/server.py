from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import shutil

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Ensure upload directories exist
UPLOAD_DIR = ROOT_DIR / "uploads"
for subdir in ["hero", "rajwada", "lal_bagh", "portraits", "audio", "documents"]:
    (UPLOAD_DIR / subdir).mkdir(parents=True, exist_ok=True)

# Models
class ArchiveObject(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    archive_id: str
    title: str
    creator: str
    date: str
    collection: str
    category: Optional[str] = None
    description: str
    keywords: List[str] = []
    image_url: str
    metadata: dict = {}
    related_records: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ArchiveObjectCreate(BaseModel):
    archive_id: str
    title: str
    creator: str
    date: str
    collection: str
    category: Optional[str] = None
    description: str
    keywords: List[str] = []
    image_url: str
    metadata: dict = {}
    related_records: List[str] = []

class VoiceRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    archive_id: str
    name: str
    role: str
    biography: str
    portrait_url: str
    audio_url: Optional[str] = None
    transcript: str
    highlighted_quote: str
    research_interests: List[str] = []
    related_objects: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class VoiceRecordCreate(BaseModel):
    archive_id: str
    name: str
    role: str
    biography: str
    portrait_url: str
    audio_url: Optional[str] = None
    transcript: str
    highlighted_quote: str
    research_interests: List[str] = []
    related_objects: List[str] = []

class Collection(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    series: str
    name: str
    description: str
    categories: List[str] = []
    object_count: int = 0

# Routes
@api_router.get("/")
async def root():
    return {"message": "Living Heritage Digital Archive API"}

# Collections
@api_router.get("/collections", response_model=List[Collection])
async def get_collections():
    collections = await db.collections.find({}, {"_id": 0}).to_list(100)
    return collections

@api_router.post("/collections", response_model=Collection)
async def create_collection(collection: Collection):
    doc = collection.model_dump()
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    await db.collections.insert_one(doc)
    return collection

# Archive Objects
@api_router.get("/archive-objects", response_model=List[ArchiveObject])
async def get_archive_objects(collection: Optional[str] = None, category: Optional[str] = None):
    query = {}
    if collection:
        query['collection'] = collection
    if category:
        query['category'] = category
    
    objects = await db.archive_objects.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for obj in objects:
        if isinstance(obj.get('created_at'), str):
            obj['created_at'] = datetime.fromisoformat(obj['created_at'])
    
    return objects

@api_router.get("/archive-objects/{object_id}", response_model=ArchiveObject)
async def get_archive_object(object_id: str):
    obj = await db.archive_objects.find_one({"id": object_id}, {"_id": 0})
    if not obj:
        raise HTTPException(status_code=404, detail="Archive object not found")
    
    if isinstance(obj.get('created_at'), str):
        obj['created_at'] = datetime.fromisoformat(obj['created_at'])
    
    return obj

@api_router.post("/archive-objects", response_model=ArchiveObject)
async def create_archive_object(obj_input: ArchiveObjectCreate):
    obj = ArchiveObject(**obj_input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.archive_objects.insert_one(doc)
    return obj

# Voice Records
@api_router.get("/voices", response_model=List[VoiceRecord])
async def get_voices():
    voices = await db.voices.find({}, {"_id": 0}).to_list(100)
    
    for voice in voices:
        if isinstance(voice.get('created_at'), str):
            voice['created_at'] = datetime.fromisoformat(voice['created_at'])
    
    return voices

@api_router.get("/voices/{voice_id}", response_model=VoiceRecord)
async def get_voice(voice_id: str):
    voice = await db.voices.find_one({"id": voice_id}, {"_id": 0})
    if not voice:
        raise HTTPException(status_code=404, detail="Voice record not found")
    
    if isinstance(voice.get('created_at'), str):
        voice['created_at'] = datetime.fromisoformat(voice['created_at'])
    
    return voice

@api_router.post("/voices", response_model=VoiceRecord)
async def create_voice(voice_input: VoiceRecordCreate):
    voice = VoiceRecord(**voice_input.model_dump())
    doc = voice.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.voices.insert_one(doc)
    return voice

# Search
@api_router.get("/search")
async def search(q: str):
    if not q:
        return {"objects": [], "voices": []}
    
    # Search in archive objects
    objects = await db.archive_objects.find(
        {"$or": [
            {"title": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}},
            {"keywords": {"$regex": q, "$options": "i"}},
            {"archive_id": {"$regex": q, "$options": "i"}}
        ]},
        {"_id": 0}
    ).limit(50).to_list(50)
    
    # Search in voices
    voices = await db.voices.find(
        {"$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"role": {"$regex": q, "$options": "i"}},
            {"biography": {"$regex": q, "$options": "i"}},
            {"transcript": {"$regex": q, "$options": "i"}}
        ]},
        {"_id": 0}
    ).limit(20).to_list(20)
    
    return {"objects": objects, "voices": voices}

# Explore/Browse
@api_router.get("/explore")
async def explore(category: Optional[str] = None):
    if category:
        objects = await db.archive_objects.find(
            {"keywords": {"$regex": category, "$options": "i"}},
            {"_id": 0}
        ).limit(100).to_list(100)
    else:
        objects = await db.archive_objects.find({}, {"_id": 0}).limit(100).to_list(100)
    
    return {"objects": objects}

# Featured Record
@api_router.get("/featured")
async def get_featured():
    # Get a random featured object
    obj = await db.archive_objects.find_one({}, {"_id": 0})
    return obj if obj else {}

# Include the router
app.include_router(api_router)

# Serve static files
if UPLOAD_DIR.exists():
    app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()