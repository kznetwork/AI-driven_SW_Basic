const features = [
  { number: "01", title: "한 번에 짧게", description: "긴 링크를 붙여 넣으면 공유하기 좋은 짧은 링크가 바로 완성됩니다." },
  { number: "02", title: "원하는 대로", description: "기억하기 쉬운 별칭으로 링크를 다듬어 브랜드와 메시지를 선명하게 전하세요." },
  { number: "03", title: "성과를 한눈에", description: "클릭 흐름을 간단한 인사이트로 확인하고 더 나은 공유 타이밍을 찾아보세요." },
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="주요 탐색">
        <a className="brand" href="#top" aria-label="LinkSnip 홈">Link<span>Snip</span></a>
        <a className="nav-link" href="#features">기능 보기</a>
      </nav>
      <section className="hero" id="top">
        <div className="eyebrow"><i />링크는 짧게, 가능성은 길게</div>
        <h1>긴 링크를<br /><em>가볍게 잘라내세요.</em></h1>
        <p className="hero-copy">LinkSnip은 복잡한 URL을 깔끔하고 기억하기 쉬운 링크로 바꿔, 어디서든 더 빠르고 자신 있게 공유하도록 돕습니다.</p>
        <a className="cta" href="#features">지금 시작하기 <span aria-hidden="true">↗</span></a>
        <div className="link-demo" aria-label="링크 단축 예시">
          <span className="demo-label">BEFORE</span>
          <span className="old-link">example.com/products/campaign/summer-2026</span>
          <span className="snip-mark" aria-hidden="true">✂</span>
          <span className="demo-label">AFTER</span>
          <strong>linksnip.kr/summer</strong>
        </div>
      </section>
      <section className="features" id="features">
        <div className="section-heading">
          <p>WHY LINKSNIP</p>
          <h2>공유의 모든 순간을<br />더 단순하게.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span>{feature.number}</span>
              <div><h3>{feature.title}</h3><p>{feature.description}</p></div>
            </article>
          ))}
        </div>
      </section>
      <footer>
        <a className="brand" href="#top">Link<span>Snip</span></a>
        <p>좋은 링크는 짧고, 기억은 오래갑니다.</p>
        <small>© 2026 LinkSnip</small>
      </footer>
    </main>
  );
}
