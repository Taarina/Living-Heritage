import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from typing import Dict, List, Any

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url: str = os.environ['MONGO_URL']
db_name: str = os.environ['DB_NAME']

async def seed_database() -> None:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Clear existing data
    await db.collections.delete_many({})
    await db.archive_objects.delete_many({})
    await db.voices.delete_many({})
    
    # Seed Collections
    collections: List[Dict[str, Any]] = [
        {
            "id": "coll-001",
            "series": "Series I",
            "name": "Rajwada",
            "description": "Architectural documentation, public spaces, and material culture of Rajwada Palace.",
            "categories": ["Architecture", "Public Space", "Objects", "Interpretation"],
            "object_count": 0
        },
        {
            "id": "coll-002",
            "series": "Series II",
            "name": "Lal Bagh",
            "description": "Interior spaces, gardens, conservation records, and decorative objects from Lal Bagh Palace.",
            "categories": ["Interiors", "Gardens", "Conservation", "Objects"],
            "object_count": 0
        },
        {
            "id": "coll-003",
            "series": "Series III",
            "name": "Voices",
            "description": "Oral histories from caretakers, researchers, and community members.",
            "categories": ["Oral Histories"],
            "object_count": 0
        }
    ]
    
    await db.collections.insert_many(collections)
    print(f"✓ Seeded {len(collections)} collections")
    
    # Seed Archive Objects
    archive_objects: List[Dict[str, Any]] = [
        {
            "id": "obj-001",
            "archive_id": "RJ-001",
            "title": "Heritage Plaque",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Interpretation",
            "description": "Official Archaeological Survey of India plaque documenting Rajwada's historical significance. The blue heritage marker contains detailed information in Hindi about the palace's construction, fire damage in 1984, and subsequent restoration efforts under state protection.",
            "keywords": ["heritage", "plaque", "conservation", "documentation", "archaeology"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/ijced69t_Screenshot%202026-07-13%20200934.png",
            "metadata": {
                "location": "Main Entrance",
                "authority": "Directorate of Archaeology, Madhya Pradesh",
                "type": "Heritage Marker"
            },
            "related_records": [],
            "created_at": "2026-01-15T10:00:00Z"
        },
        {
            "id": "obj-002",
            "archive_id": "RJ-002",
            "title": "Protected Monument Notice",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Conservation",
            "description": "Bilingual protected monument signage (Hindi and English) declaring Rajwada as a state heritage site under the Madhya Pradesh Ancient Monuments Act, 1975. The plaque outlines prohibited activities and conservation regulations established in 1999.",
            "keywords": ["conservation", "protection", "monument", "heritage", "regulations"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/lb8j5cty_Screenshot%202026-07-13%20201013.png",
            "metadata": {
                "location": "Entrance Wall",
                "legislation": "MP Ancient Monuments Act 1975",
                "protected_since": "1999"
            },
            "related_records": ["RJ-001"],
            "created_at": "2026-01-15T11:00:00Z"
        },
        {
            "id": "obj-003",
            "archive_id": "RJ-003",
            "title": "Stone Wall Detail with Commemorative Plaque",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Architecture",
            "description": "Weathered stone masonry wall featuring an ornate carved wooden bracket and a commemorative plaque marking Rajwada Indore. The juxtaposition of rough stone, intricate carvings, and official documentation illustrates layers of the palace's material history.",
            "keywords": ["stonework", "wall", "plaque", "carving", "masonry"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/3sd2e2mc_Screenshot%202026-07-13%20201029.png",
            "metadata": {
                "location": "Exterior Wall",
                "materials": "Stone, Wood",
                "period": "18th Century with later additions"
            },
            "related_records": ["RJ-001", "RJ-002"],
            "created_at": "2026-01-16T10:00:00Z"
        },
        {
            "id": "obj-004",
            "archive_id": "RJ-004",
            "title": "Ornate Wooden Gateway",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Architecture",
            "description": "Monumental wooden door with distinctive scalloped cusped arch, demonstrating the fusion of Maratha and Mughal architectural traditions. The massive teak panels are studded with iron bolts, while the surrounding stonework displays intricate floral and geometric carvings. Visitor information plaques indicate current timings.",
            "keywords": ["door", "gateway", "arch", "woodwork", "carving", "entrance"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/k3rkgtj0_Screenshot%202026-07-13%20201041.png",
            "metadata": {
                "location": "Main Entrance",
                "material": "Teak wood, Iron, Stone",
                "style": "Maratha-Mughal fusion"
            },
            "related_records": ["RJ-005"],
            "created_at": "2026-01-16T11:00:00Z"
        },
        {
            "id": "obj-005",
            "archive_id": "RJ-005",
            "title": "Palace Facade",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Architecture",
            "description": "The iconic seven-story facade of Rajwada Palace rising above Indore's Rajwada Chowk. Built in 1747 by Holkar rulers, the structure showcases Maratha architectural grandeur with its projecting balconies, ornate jharokhas, and distinctive cylindrical towers. The palace combines stone lower stories with upper wooden galleries, exemplifying Indo-Saracenic palace architecture.",
            "keywords": ["facade", "palace", "architecture", "holkar", "towers", "heritage"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/p07kwv9m_Screenshot%202026-07-13%20201051.png",
            "metadata": {
                "location": "Rajwada Chowk",
                "height": "Seven Stories",
                "built": "1747",
                "dynasty": "Holkar"
            },
            "related_records": ["RJ-004"],
            "created_at": "2026-01-17T10:00:00Z"
        },
        {
            "id": "obj-006",
            "archive_id": "RJ-006",
            "title": "Interior Courtyard Through Pillars",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Architecture",
            "description": "View of the inner courtyard framed by thick stone pillars with carved brackets and cusped arches. The multi-story courtyard showcases the palace's layered architectural composition, with light filtering through successive archways. The interplay of shadow and light emphasizes the depth of Maratha palatial design.",
            "keywords": ["courtyard", "pillars", "arches", "interior", "perspective"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/uvayhis0_Screenshot%202026-07-13%20202745.png",
            "metadata": {
                "location": "Inner Courtyard",
                "material": "Stone",
                "architectural_feature": "Multi-story arcade"
            },
            "related_records": ["RJ-007"],
            "created_at": "2026-01-17T11:00:00Z"
        },
        {
            "id": "obj-007",
            "archive_id": "RJ-007",
            "title": "Stone Corridor with Scalloped Arches",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Architecture",
            "description": "A monumental stone corridor extending through successive cusped arches creates a dramatic vanishing point. The weathered stone pillars with carved capitals demonstrate traditional Maratha construction techniques. The repetitive archways create a rhythmic architectural sequence typical of 18th-century palace design.",
            "keywords": ["corridor", "arches", "perspective", "stone", "pillars"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/cz6ck6ax_Screenshot%202026-07-13%20202814.png",
            "metadata": {
                "location": "Main Corridor",
                "material": "Stone",
                "architectural_style": "Maratha"
            },
            "related_records": ["RJ-006", "RJ-008"],
            "created_at": "2026-01-17T12:00:00Z"
        },
        {
            "id": "obj-008",
            "archive_id": "RJ-008",
            "title": "Carved Archway Detail",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Architecture",
            "description": "Close perspective of interior archways revealing intricate stone carving and layered cusped arches. The weathered stone surfaces show traces of past restoration work. This view captures the palace's architectural vocabulary of repeated scalloped forms and ornate capitals that define Holkar period architecture.",
            "keywords": ["archway", "carving", "detail", "stone", "cusped arch"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/a7hrczhl_Screenshot%202026-07-13%20202912.png",
            "metadata": {
                "location": "Interior Arcade",
                "material": "Carved Stone",
                "condition": "Weathered, partially restored"
            },
            "related_records": ["RJ-007"],
            "created_at": "2026-01-17T13:00:00Z"
        },
        {
            "id": "obj-009",
            "archive_id": "RJ-009",
            "title": "Open Courtyard",
            "creator": "Taarina Chandiramani",
            "date": "2026-03",
            "collection": "Rajwada",
            "category": "Public Space",
            "description": "The palace's central open courtyard showing the contrast between white-plastered and exposed sandstone sections. Large cusped arches define the ground level, while upper stories display continuous arcaded galleries. This space served as the main ceremonial and public gathering area of the palace complex.",
            "keywords": ["courtyard", "public space", "arches", "plaza", "ceremonial"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/tiia80mb_Screenshot%202026-07-13%20202948.png",
            "metadata": {
                "location": "Central Courtyard",
                "function": "Ceremonial space",
                "materials": "Sandstone, plaster"
            },
            "related_records": ["RJ-006"],
            "created_at": "2026-01-17T14:00:00Z"
        },
        {
            "id": "obj-010",
            "archive_id": "LB-018",
            "title": "Assembly Hall",
            "creator": "Taarina Chandiramani",
            "date": "2025-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "The grand assembly hall features ornate chandeliers, Italian marble floors, and European-style furniture. This space reflects the cosmopolitan tastes of the Holkar rulers.",
            "keywords": ["interior", "hall", "chandelier", "marble", "colonial"],
            "image_url": "https://images.unsplash.com/photo-1780245996835-90c0ac8bf4dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHw0fHx2aW50YWdlJTIwaGlzdG9yaWNhbCUyMG9iamVjdHN8ZW58MHx8fHwxNzg0MDExMzExfDA&ixlib=rb-4.1.0&q=85",
            "metadata": {
                "location": "Main Hall",
                "material": "Italian Marble",
                "period": "Late 19th Century"
            },
            "related_records": [],
            "created_at": "2026-01-16T10:00:00Z"
        },
        {
            "id": "obj-011",
            "archive_id": "LB-025",
            "title": "Rose Garden",
            "creator": "Taarina Chandiramani",
            "date": "2025-04",
            "collection": "Lal Bagh",
            "category": "Gardens",
            "description": "The palace gardens feature symmetrical pathways, fountains, and seasonal plantings. The rose garden was personally designed by Maharani Ahilyabai Holkar.",
            "keywords": ["garden", "landscape", "roses", "fountain", "heritage"],
            "image_url": "https://images.unsplash.com/photo-1777620842997-bc178ed2599b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaGlzdG9yaWNhbCUyMG9iamVjdHN8ZW58MHx8fHwxNzg0MDExMzExfDA&ixlib=rb-4.1.0&q=85",
            "metadata": {
                "location": "East Gardens",
                "area": "2 Acres",
                "designed_by": "Maharani Ahilyabai Holkar"
            },
            "related_records": ["LB-018"],
            "created_at": "2026-01-16T11:00:00Z"
        }
    ]
    
    await db.archive_objects.insert_many(archive_objects)
    print(f"✓ Seeded {len(archive_objects)} archive objects")
    
    # Seed Voice Records
    voices: List[Dict[str, Any]] = [
        {
            "id": "voice-001",
            "archive_id": "OH-001",
            "name": "Hrishchand Mishra",
            "role": "Caretaker",
            "biography": "Hrishchand Mishra has served as the head caretaker of Rajwada Palace for over 35 years. His family has maintained the palace grounds for three generations, preserving traditional maintenance practices while adapting to modern conservation needs.",
            "portrait_url": "https://images.pexels.com/photos/29679833/pexels-photo-29679833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "audio_url": None,
            "transcript": "I remember when I first started working here as a young man. My father would tell me stories about the palace before independence. The wooden pillars, the stone carvings - everything has a story. We've seen the palace through fires, renovations, and restoration efforts. Every day, I walk through these corridors and feel the weight of history. My responsibility is not just to maintain the building, but to preserve the memory of what this place means to Indore.",
            "highlighted_quote": "Every day, I walk through these corridors and feel the weight of history.",
            "research_interests": [],
            "related_objects": ["RJ-014", "RJ-022"],
            "created_at": "2026-01-17T10:00:00Z"
        },
        {
            "id": "voice-002",
            "archive_id": "OH-002",
            "name": "Ankit Verma",
            "role": "Archival Researcher",
            "biography": "Ankit Verma is an independent researcher specializing in Maratha architecture and heritage conservation. He has published extensively on the palaces of Central India and has been instrumental in documenting Rajwada's architectural evolution.",
            "portrait_url": "https://images.pexels.com/photos/38281680/pexels-photo-38281680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "audio_url": None,
            "transcript": "Rajwada represents a unique moment in Indian architectural history. It combines Maratha military architecture with Mughal decorative elements, creating something distinctly regional. What fascinates me is how the building has adapted over time - from royal residence to administrative center to cultural monument. Each layer tells us something about how Indore has evolved.",
            "highlighted_quote": "Each layer tells us something about how Indore has evolved.",
            "research_interests": ["Architecture", "Conservation", "Urban History"],
            "related_objects": ["RJ-014", "RJ-022"],
            "created_at": "2026-01-17T11:00:00Z"
        },
        {
            "id": "voice-003",
            "archive_id": "OH-003",
            "name": "Pushyamitra Bhargava",
            "role": "Mayor of Indore",
            "biography": "Pushyamitra Bhargava served as Mayor of Indore from 2019 to 2024, during which time he championed several heritage conservation initiatives. His administration prioritized the preservation of the city's historic monuments while promoting sustainable urban development.",
            "portrait_url": "https://images.pexels.com/photos/29679833/pexels-photo-29679833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "audio_url": None,
            "transcript": "As mayor, I see these palaces as more than historical monuments - they are living parts of our city. Rajwada sits at the heart of our busiest market. Every day, thousands of people pass by it. We need to balance conservation with accessibility, making sure these spaces remain relevant to contemporary life while preserving their historical significance.",
            "highlighted_quote": "These palaces are living parts of our city.",
            "research_interests": ["Urban Planning", "Heritage Policy", "Public Engagement"],
            "related_objects": ["RJ-014", "RJ-022", "LB-018"],
            "created_at": "2026-01-17T12:00:00Z"
        }
    ]
    
    await db.voices.insert_many(voices)
    print(f"✓ Seeded {len(voices)} voice records")
    
    print("\n✅ Database seeding completed successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
