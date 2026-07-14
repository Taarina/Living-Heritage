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
            "archive_id": "LB-001",
            "title": "Protected Monument Heritage Plaque",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Conservation",
            "description": "Official Archaeological Survey of India protected monument marker set within the lush gardens of Lal Bagh Palace. The bilingual plaque (Hindi and English) documents the palace's historical significance and conservation status under state heritage protection. The surrounding mature trees and vegetation emphasize the palace's integration with landscape design.",
            "keywords": ["heritage", "plaque", "conservation", "gardens", "protected monument"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/hx2hlolr_Screenshot%202026-07-13%20204453.png",
            "metadata": {
                "location": "Palace Gardens",
                "authority": "Archaeological Survey of India",
                "type": "Heritage Marker"
            },
            "related_records": [],
            "created_at": "2026-01-18T10:00:00Z"
        },
        {
            "id": "obj-011",
            "archive_id": "LB-002",
            "title": "Entrance Information Board",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interpretation",
            "description": "Blue informational plaque at the palace entrance, positioned against corrugated fencing and mature tree canopy. The weathered signage and informal entrance setting document the palace's current state as a protected heritage site undergoing preservation, contrasting with its historical grandeur.",
            "keywords": ["entrance", "signage", "information", "conservation", "access"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/qjp0s4lw_Screenshot%202026-07-13%20204513.png",
            "metadata": {
                "location": "Service Entrance",
                "condition": "Active conservation site",
                "type": "Informational marker"
            },
            "related_records": ["LB-001"],
            "created_at": "2026-01-18T11:00:00Z"
        },
        {
            "id": "obj-012",
            "archive_id": "LB-003",
            "title": "Palace Gate with Heritage Signage",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Architecture",
            "description": "View of the ornate Victorian-style iron gates framed by white neoclassical pillars. The blue Lal Bagh Palace identification board (in Hindi and English) marks this entrance. The juxtaposition of European architectural elements with Indian landscaping reflects the cosmopolitan aesthetic of the Holkar rulers.",
            "keywords": ["gate", "entrance", "iron work", "pillars", "signage", "architecture"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/lukciat5_Screenshot%202026-07-13%20204526.png",
            "metadata": {
                "location": "Main Gate",
                "style": "Victorian Indo-European",
                "materials": "Iron, Stone, Plaster"
            },
            "related_records": ["LB-005"],
            "created_at": "2026-01-18T12:00:00Z"
        },
        {
            "id": "obj-013",
            "archive_id": "LB-004",
            "title": "Garden Heritage Marker",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Gardens",
            "description": "Blue heritage information plaque positioned within the palace's formal gardens, featuring pink paved pathways, manicured lawns, and ornamental plantings. The marker provides historical context about Maharaja Tukoji Rao Holkar II's construction of the palace (1886-1921) and documents the evolution of the gardens as part of the palace's European-inspired design.",
            "keywords": ["gardens", "landscape", "heritage", "plaque", "pathways", "conservation"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/coob0gtq_Screenshot%202026-07-13%20204656.png",
            "metadata": {
                "location": "Formal Gardens",
                "period": "Late 19th Century",
                "landscape_style": "European formal garden"
            },
            "related_records": ["LB-001"],
            "created_at": "2026-01-18T13:00:00Z"
        },
        {
            "id": "obj-014",
            "archive_id": "LB-005",
            "title": "Main Gateway Entrance",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Architecture",
            "description": "The monumental entrance to Lal Bagh Palace featuring four imposing white neoclassical columns topped with carved lion sculptures symbolizing royal authority. The ornate Victorian wrought-iron gates display intricate scrollwork. Behind, the tree-lined avenue creates a ceremonial approach typical of European palace design, reflecting Maharaja Tukoji Rao Holkar II's vision of a modern Indo-European palace.",
            "keywords": ["gateway", "entrance", "lions", "pillars", "gates", "neoclassical", "architecture"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/uzk1qfq2_Screenshot%202026-07-13%20204708.png",
            "metadata": {
                "location": "Main Entrance",
                "built": "1886-1921",
                "style": "Neoclassical European",
                "ruler": "Maharaja Tukoji Rao Holkar II"
            },
            "related_records": ["LB-003"],
            "created_at": "2026-01-18T14:00:00Z"
        },
        {
            "id": "obj-015",
            "archive_id": "LB-006",
            "title": "Ornate Vaulted Ceiling with Peacock Murals",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "Spectacular barrel-vaulted ceiling adorned with painted peacock motifs in recessed arched panels, flanked by delicate botanical garlands. The baroque plasterwork features Greek key patterns and ornamental borders. The dual peacocks symbolize royalty and beauty in Indian iconography, integrated here within European architectural vocabulary, exemplifying the Indo-European aesthetic of the palace interiors.",
            "keywords": ["ceiling", "peacock", "murals", "baroque", "plasterwork", "interiors", "painting"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/fivvtlk7_Screenshot%202026-07-13%20204741.png",
            "metadata": {
                "location": "Main Corridor",
                "style": "Baroque European with Indian motifs",
                "period": "Late 19th Century",
                "technique": "Fresco painting, ornamental plaster"
            },
            "related_records": ["LB-007"],
            "created_at": "2026-01-19T10:00:00Z"
        },
        {
            "id": "obj-016",
            "archive_id": "LB-007",
            "title": "Gilded Reception Hall",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "The palace's grand reception hall displays opulent baroque decoration with gilded stucco work, faux marble pilasters, and an elaborate coffered ceiling. French doors open to garden terraces, while period furniture and Persian carpets complete the formal European salon aesthetic. Velvet rope barriers indicate its current museum status. The room reflects the Holkar court's adoption of European palatial fashion.",
            "keywords": ["reception", "hall", "baroque", "gilded", "marble", "furniture", "interiors"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/3u54htzy_Screenshot%202026-07-13%20204759.png",
            "metadata": {
                "location": "Reception Hall / Durbar Room",
                "style": "French Baroque",
                "features": "Gilded stucco, coffered ceiling, marble columns",
                "current_use": "Museum display"
            },
            "related_records": ["LB-006"],
            "created_at": "2026-01-19T11:00:00Z"
        },
        {
            "id": "obj-017",
            "archive_id": "LB-008",
            "title": "Conservation Display in Entrance Hall",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Conservation",
            "description": "Two informational display boards documenting ongoing conservation efforts stand in the marble entrance hall beneath a historic portrait and ornate Corinthian column. The panels show before-and-after photographs of restoration work, illustrating the palace's transformation from deterioration to preservation. This documentation makes visible the complex conservation process required to maintain such heritage structures.",
            "keywords": ["conservation", "restoration", "display", "documentation", "heritage", "preservation"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/5e843pz0_Screenshot%202026-07-13%20204824.png",
            "metadata": {
                "location": "Main Entrance Hall",
                "conservation_authority": "Archaeological Survey of India",
                "documentation_type": "Photo panels",
                "period": "21st Century conservation"
            },
            "related_records": ["LB-009"],
            "created_at": "2026-01-19T12:00:00Z"
        },
        {
            "id": "obj-018",
            "archive_id": "LB-009",
            "title": "Conservation Panel - Periodic Interiors",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Conservation",
            "description": "Detailed conservation documentation panel titled 'Conservation of Periodic Interiors - Lal Bagh Palace' displaying comparative photographs of restoration work. The panel illustrates conservation of doorways, entrance porches, wall treatments, and architectural elements. The before-and-after images document the meticulous work required to restore the palace's late 19th-century European-style interiors while preserving historical authenticity.",
            "keywords": ["conservation", "restoration", "interiors", "documentation", "heritage", "periodic"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/6kjwuzju_Screenshot%202026-07-13%20204858.png",
            "metadata": {
                "location": "Entrance Hall",
                "panel_title": "Conservation of Periodic Interiors",
                "documentation": "Before/after restoration photos",
                "conservation_scope": "Doorways, porches, walls, architectural details"
            },
            "related_records": ["LB-008"],
            "created_at": "2026-01-19T13:00:00Z"
        },
        {
            "id": "obj-019",
            "archive_id": "LB-010",
            "title": "Stained Glass Window - Holkar Royal Crest",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Objects",
            "description": "Semicircular stained glass fanlight displaying the Holkar royal coat of arms in vibrant colored glass. The heraldic crest features traditional Maratha symbols beneath a royal crown, executed in European stained glass technique. Set within a carved stone archway and dark wooden frame, this transom window exemplifies the fusion of Indian royal iconography with Victorian decorative arts favored by the Holkar dynasty.",
            "keywords": ["stained glass", "royal crest", "holkar", "heraldry", "window", "decorative arts"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/kgnkzlac_Screenshot%202026-07-13%20205015.png",
            "metadata": {
                "location": "Main Doorway",
                "technique": "Stained glass",
                "style": "Victorian with Indian royal heraldry",
                "dynasty": "Holkar"
            },
            "related_records": ["LB-007"],
            "created_at": "2026-01-19T14:00:00Z"
        },
        {
            "id": "obj-020",
            "archive_id": "LB-011",
            "title": "Painted Ceiling Dome - Classical Fresco",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "Monumental oval ceiling fresco depicting classical mythological figures floating amid clouds in the tradition of European baroque ceiling painting. The central composition features deities and cherubs in dynamic poses, rendered in soft pastels of blue, pink, and gold. The fresco is surrounded by an elaborate gilded stucco frame with acanthus leaf molding and three-dimensional floral reliefs, demonstrating the palace's commitment to European artistic traditions.",
            "keywords": ["ceiling", "fresco", "painting", "baroque", "mythology", "gilded", "plasterwork"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/9l5oj847_Screenshot%202026-07-13%20205259.png",
            "metadata": {
                "location": "Main Durbar Hall",
                "technique": "Ceiling fresco",
                "style": "European Baroque",
                "subject": "Classical mythology"
            },
            "related_records": ["LB-012"],
            "created_at": "2026-01-20T10:00:00Z"
        },
        {
            "id": "obj-021",
            "archive_id": "LB-012",
            "title": "Grand Durbar Hall with Throne",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "The palace's ceremonial throne room showcasing the apex of Indo-European palatial design. The room features the painted dome ceiling with mythological frescoes, massive Belgian crystal chandeliers, and mint-green walls adorned with gilded rococo decorations. The royal throne sits elevated on a dais beneath purple velvet canopy drapery. Period furniture arranged on intricate carpets creates formal reception spaces. This hall served as the primary ceremonial and state function space of the Holkar court.",
            "keywords": ["durbar", "throne room", "ceremonial", "chandelier", "baroque", "royal", "state room"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/bfzminca_Screenshot%202026-07-13%20205406.png",
            "metadata": {
                "location": "Main Durbar Hall",
                "function": "State ceremonies and audiences",
                "style": "French Baroque/Rococo",
                "features": "Throne dais, crystal chandeliers, painted ceiling"
            },
            "related_records": ["LB-011", "LB-007"],
            "created_at": "2026-01-20T11:00:00Z"
        },
        {
            "id": "obj-022",
            "archive_id": "LB-013",
            "title": "Portrait Gallery with Marble Fireplace",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "Intimate portrait gallery displaying oil paintings of Holkar family members in gilded frames against pale green walls. The room centers on an ornately carved white marble fireplace with a functioning hearth. A magnificent Belgian crystal chandelier illuminates the space, while fluted Corinthian columns and gilded rococo wall decorations frame the portraits. The painted floor covering displays baroque floral patterns. This room served as a private reception and family portrait gallery.",
            "keywords": ["portrait", "gallery", "fireplace", "marble", "chandelier", "family", "paintings"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/d6e1gesq_Screenshot%202026-07-13%20205451.png",
            "metadata": {
                "location": "Portrait Gallery Room",
                "features": "Marble fireplace, family portraits, crystal chandelier",
                "style": "European Rococo",
                "function": "Private reception and portrait display"
            },
            "related_records": ["LB-014"],
            "created_at": "2026-01-20T12:00:00Z"
        },
        {
            "id": "obj-023",
            "archive_id": "LB-014",
            "title": "Portrait Gallery - Alternate View",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "Another perspective of the portrait gallery revealing the room's extensive collection of royal family portraits in elaborate gilded frames. The walls display intricate gold-leaf rococo decorations cascading between the paintings. The crystal chandelier and period furniture create an elegant salon atmosphere. The asymmetrical arrangement of portraits of varying sizes demonstrates Victorian gallery hanging practices, while the ornate gilded swags and cartouches frame each artwork.",
            "keywords": ["portraits", "gilded", "rococo", "chandelier", "royal family", "gallery", "decorative arts"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/7682elv8_Screenshot%202026-07-13%20205700.png",
            "metadata": {
                "location": "Portrait Gallery Room",
                "collection": "Holkar family portraits",
                "decorative_style": "Gilded rococo",
                "period": "19th-20th Century"
            },
            "related_records": ["LB-013"],
            "created_at": "2026-01-20T13:00:00Z"
        },
        {
            "id": "obj-024",
            "archive_id": "LB-015",
            "title": "Inner Courtyard with Tiger Display",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Objects",
            "description": "The palace's two-story neoclassical inner courtyard features a continuous arcade of semicircular arches supported by columns. In the foreground, a taxidermied Bengal tiger in a glass display case represents the royal hunting tradition and the Holkar connection to wildlife. The courtyard's museum configuration includes display panels and lighting, showing the palace's transformation into a public heritage museum. The architecture demonstrates Italian Renaissance-inspired courtyard design adapted to Indian climate.",
            "keywords": ["courtyard", "tiger", "arcade", "museum", "architecture", "neoclassical", "display"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/ix95hssj_Screenshot%202026-07-13%20205728.png",
            "metadata": {
                "location": "Inner Courtyard",
                "architecture": "Neoclassical arcade",
                "museum_display": "Bengal tiger specimen",
                "style": "Italian Renaissance courtyard"
            },
            "related_records": ["LB-012"],
            "created_at": "2026-01-20T14:00:00Z"
        },
        {
            "id": "obj-025",
            "archive_id": "LB-016",
            "title": "Palace Facade - Main Building",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Architecture",
            "description": "The imposing white neoclassical facade of Lal Bagh Palace stands symmetrically before a cobblestone courtyard. The three-story structure displays European architectural elements including pilasters, cornices, and a central balcony with ornamental ironwork. The dark wooden entrance portico with its black wrought-iron canopy creates a dramatic focal point. Built between 1886-1921 by Maharaja Tukoji Rao Holkar II, this facade represents the Holkar dynasty's embrace of European architectural modernism while establishing Indore as a progressive princely state.",
            "keywords": ["facade", "palace", "neoclassical", "architecture", "white building", "entrance", "holkar"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/kseniwc5_Screenshot%202026-07-14%20133006.png",
            "metadata": {
                "location": "Main Palace Building",
                "built": "1886-1921",
                "style": "European Neoclassical",
                "ruler": "Maharaja Tukoji Rao Holkar II",
                "color": "White painted plaster"
            },
            "related_records": ["LB-017"],
            "created_at": "2026-01-21T10:00:00Z"
        },
        {
            "id": "obj-026",
            "archive_id": "LB-017",
            "title": "Nehru Kendra Name Plaque",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interpretation",
            "description": "Bronze nameplate reading 'नेहरू केंद्र' (Nehru Kendra) positioned in the palace courtyard, indicating the building's current function as a cultural center. Above the entrance door, the Holkar royal crest remains carved in stone, while circular medallions with baroque relief decorations adorn the white plastered walls. The plaque documents the palace's post-independence transformation from royal residence to public cultural institution, preserving heritage while serving contemporary civic purposes.",
            "keywords": ["plaque", "nameplate", "nehru kendra", "cultural center", "signage", "holkar crest"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/8gbz7gq1_Screenshot%202026-07-14%20133021.png",
            "metadata": {
                "location": "Main Entrance Courtyard",
                "current_function": "Nehru Kendra Cultural Center",
                "period": "Post-independence adaptation"
            },
            "related_records": ["LB-016"],
            "created_at": "2026-01-21T11:00:00Z"
        },
        {
            "id": "obj-027",
            "archive_id": "LB-018",
            "title": "Islamic Hall with Ornate Pillars",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "A spectacular hall showcasing Indo-Islamic architectural vocabulary with intricately carved stone pillars featuring geometric and floral patterns. Each column displays different designs - some with Celtic knotwork patterns, others with traditional Islamic arabesques. The cusped arches frame tall windows with blue stained glass in geometric patterns. The ornate plasterwork ceiling displays star and flower motifs. The polished checkered marble floor reflects the filtered colored light, creating an ethereal atmosphere that demonstrates the Holkar court's appreciation of diverse architectural traditions.",
            "keywords": ["islamic", "hall", "carved pillars", "arabesques", "stained glass", "marble floor", "cusped arches"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/e5pmy5gq_Screenshot%202026-07-14%20134138.png",
            "metadata": {
                "location": "Islamic Hall",
                "style": "Indo-Islamic with Mughal influence",
                "features": "Carved stone pillars, stained glass windows, ornate ceiling",
                "floor": "Checkered marble"
            },
            "related_records": ["LB-019"],
            "created_at": "2026-01-21T12:00:00Z"
        },
        {
            "id": "obj-028",
            "archive_id": "LB-019",
            "title": "Islamic Hall - Window Gallery View",
            "creator": "Taarina Chandiramani",
            "date": "2026-04",
            "collection": "Lal Bagh",
            "category": "Interiors",
            "description": "Alternate perspective of the Islamic-inspired hall revealing the full rhythm of carved pillars leading to the windowed gallery. Five tall cusped archways frame blue and white geometric stained glass windows that cast colored light across the reflective marble floor. The ceiling's honeycomb pattern and floral medallions demonstrate sophisticated plasterwork techniques. Wall-mounted lamps provide soft illumination. This hall exemplifies the eclectic architectural synthesis characteristic of late 19th-century Indian palace design, blending Mughal heritage with European structural innovations.",
            "keywords": ["islamic architecture", "windows", "stained glass", "pillars", "gallery", "marble", "cusped arches"],
            "image_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/h1sx8ms2_Screenshot%202026-07-14%20134210.png",
            "metadata": {
                "location": "Islamic Hall",
                "architectural_elements": "Five cusped arches, stained glass gallery",
                "ceiling": "Honeycomb plasterwork with floral medallions",
                "lighting": "Natural colored light through stained glass"
            },
            "related_records": ["LB-018"],
            "created_at": "2026-01-21T13:00:00Z"
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
            "portrait_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/oweoag19_Screenshot%202026-07-14%20135409.png",
            "audio_url": "https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/t41yabvo_Sheetal%20Nagar%206%20%281%29%20%28online-video-cutter.com%29.m4a",
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
