import csv
import re
import os

csv_file = r'c:\Dev\캡스톤디자인\workspace\gachatrip_2\gachatrip\tour_data_all.csv'
output_sql = r'c:\Dev\캡스톤디자인\workspace\gachatrip_2\gachatrip\backend\src\main\resources\tour_data_insert.sql'

def extract_region(addr):
    if not addr:
        return '기타'
    parts = addr.strip().split()
    if len(parts) >= 2:
        r1, r2 = parts[0], parts[1]
        mapping = {
            '서울': '서울', '부산': '부산', '대구': '대구', '인천': '인천',
            '광주': '광주', '대전': '대전', '울산': '울산', '세종': '세종',
            '경기': '경기', '강원': '강원', '충청북': '충북', '충북': '충북',
            '충청남': '충남', '충남': '충남', '전라북': '전북', '전북': '전북',
            '전라남': '전남', '전남': '전남', '경상북': '경북', '경북': '경북',
            '경상남': '경남', '경남': '경남', '제주': '제주'
        }
        for k, v in mapping.items():
            if k in r1:
                return f"{v} {r2}"
        return f"{r1} {r2}"
    return parts[0] if parts else '기타'

def clean(text):
    if not text:
        return ''
    return text.replace("'", "''").strip()

destinations = []
places = []

with open(csv_file, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    for idx, row in enumerate(reader):
        title = clean(row.get('title'))
        addr1 = clean(row.get('addr1'))
        addr2 = clean(row.get('addr2'))
        firstimage = clean(row.get('firstimage'))
        mapx = row.get('mapx')
        mapy = row.get('mapy')
        contenttypeid = row.get('contenttypeid')

        # 사진이 있고 유효한 좌표가 있는 행만 추출
        if not firstimage or not firstimage.startswith('http') or not mapx or not mapy:
            continue
        
        try:
            lng = float(mapx)
            lat = float(mapy)
        except ValueError:
            continue

        addr = (addr1 + ' ' + addr2).strip()
        region = extract_region(addr1)
        type_id = int(contenttypeid.strip()) if contenttypeid and contenttypeid.strip().isdigit() else 12

        if type_id in (12, 14, 15): # 관광지 / 문화시설 / 축제
            destinations.append({
                'content_id': f"TOUR_{type_id}_{idx+1}",
                'title': title,
                'region': region,
                'addr': addr,
                'image': firstimage,
                'lat': lat,
                'lng': lng
            })
        elif type_id in (39, 28): # 식당 / 레포츠
            places.append({
                'name': title,
                'category': 'RESTAURANT' if type_id == 39 else 'ACTIVITY',
                'addr': addr,
                'image': firstimage,
                'lat': lat,
                'lng': lng
            })

print(f"Extracted {len(destinations)} destinations, {len(places)} places with high-quality photos!")

# SQL 파일 생성 (최대 대표 300개 관광지 + 300개 추천 장소로 최적화하여 H2 메모리 및 속도 극대화)
with open(output_sql, 'w', encoding='utf-8') as out:
    out.write("-- Tour API Seed Data\nSET REFERENTIAL_INTEGRITY FALSE;\n\n")
    
    # destinations (상위 300개)
    for i, d in enumerate(destinations[:300]):
        dest_id = i + 10 # 기본 1~6 이후부터
        overview = f"{d['region']}에 위치한 매력적인 관광 명소 {d['title']}입니다."
        out.write(f"MERGE INTO destinations (id, content_id, title, region, address, overview, image_url, latitude, longitude, is_active) KEY (id) VALUES ({dest_id}, '{d['content_id']}', '{d['title']}', '{d['region']}', '{d['addr']}', '{overview}', '{d['image']}', {d['lat']}, {d['lng']}, TRUE);\n")
    
    # places (상위 200개)
    for j, p in enumerate(places[:200]):
        place_id = j + 10 # 기본 1~4 이후부터
        # 연결할 대표 destination_id (1~6 중 순환)
        target_dest_id = (j % 6) + 1
        desc = f"{p['addr']} 인근에 위치한 추천 스팟"
        out.write(f"MERGE INTO places (id, destination_id, name, category, address, description, image_url, latitude, longitude) KEY (id) VALUES ({place_id}, {target_dest_id}, '{p['name']}', '{p['category']}', '{p['addr']}', '{desc}', '{p['image']}', {p['lat']}, {p['lng']});\n")
        
    out.write("\nSET REFERENTIAL_INTEGRITY TRUE;\n")

print(f"Generated {output_sql} successfully!")
