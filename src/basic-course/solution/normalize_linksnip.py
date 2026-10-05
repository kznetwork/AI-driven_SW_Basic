import re
from pathlib import Path

root = Path(r"c:\Users\kz4ne\Downloads\기초\Codex_실습폴더")
pattern = re.compile(r"linksnip|linksnip", re.IGNORECASE)
count = 0

for path in root.rglob('*'):
    if not path.is_file():
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        continue
    new = pattern.sub('linksnip', text)
    if new != text:
        path.write_text(new, encoding='utf-8')
        count += 1

print(f"updated_files={count}")
