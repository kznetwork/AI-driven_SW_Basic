import argparse, glob, json, os, datetime

def find_latest(sessions_dir):
    files = glob.glob(os.path.join(sessions_dir, "**", "*.jsonl"), recursive=True)
    return max(files, key=os.path.getmtime) if files else None

def to_markdown(path):
    lines, count = [], 0
    with open(path, encoding="utf-8") as f:
        for raw in f:
            raw = raw.strip()
            if not raw:
                continue
            msg = json.loads(raw)
            msg = msg.get("payload", msg)          # rollout 형식이면 payload 사용
            if "role" not in msg:
                continue                           # 메시지만 기록
            role = msg["role"]
            text = msg.get("content") or msg.get("text") or ""
            if isinstance(text, list):
                text = "".join(p.get("text", "") for p in text)
            title = "사용자" if role == "user" else ("Codex" if role == "assistant" else role)
            lines += ["## " + title, "", text, ""]
            count += 1
    return lines, count

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sessions-dir", default=os.path.expanduser("~/.codex/sessions"))
    ap.add_argument("--out", default="exports")
    args = ap.parse_args()
    latest = find_latest(args.sessions_dir)
    if latest is None:
        print("세션 파일을 찾을 수 없음:", args.sessions_dir); raise SystemExit(1)
    body, count = to_markdown(latest)
    os.makedirs(args.out, exist_ok=True)
    stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
    out_path = os.path.join(args.out, "thread-" + stamp + ".md")
    header = ["# Thread Export", "",
              "- 세션 파일: " + os.path.basename(latest),
              "- 내보낸 시각: " + stamp,
              "- 메시지 수: " + str(count), "", "---", ""]
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(header + body))
    print("내보내기 완료:", out_path)

if __name__ == "__main__":
    main()
