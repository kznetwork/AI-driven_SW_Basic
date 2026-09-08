from pathlib import Path
from docx import Document

src = Path(r"C:\DEV\codex-hello\notice_kr.docx")
dst = Path(r"C:\DEV\codex-hello\notice_en.docx")
doc = Document(src)

run_texts = {
    0: ["Notice: Enhanced Inspection of the Initial Shipment of New LCD Modules for Line A"],
    2: ["To all members of the Production and Quality Control Teams,"],
    3: [
        "The initial shipment from the new LCD module supplier (secondary vendor) is scheduled to arrive at Line A on ",
        "Thursday, September 3",
        ". Because the defect rate of this initial shipment must be compared with that of the existing line, please ensure that the following requirements are observed.",
    ],
    5: ["Clearly identify the supplier in the designated supplier column of the inspection records for all products manufactured using the initial shipment."],
    6: ["Increase the sample size for LCD staining and delayed touch response inspections to achieve coverage as close to 100% as possible."],
    7: ["If a defect is found, immediately report it with a photo to Assistant Manager Doyoon Lee of the Quality Control Team."],
    8: ["Enter the results in the consolidated inspection record file (A_Line_통합_검사기록.xlsx) on the same day."],
    10: [
        "This notice will remain in effect ",
        "until the initial shipment inspection is completed on Thursday, September 10",
        ". Please contact the Quality Control Team with any questions.",
    ],
    12: ["Thank you."],
    14: ["Quality Control Team"],
}

for p_idx, texts in run_texts.items():
    para = doc.paragraphs[p_idx]
    if len(para.runs) != len(texts):
        raise RuntimeError(f"Unexpected run count in paragraph {p_idx}: {len(para.runs)}")
    for run, text in zip(para.runs, texts):
        run.text = text

doc.save(dst)
print(dst)
