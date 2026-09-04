"use client";

import { useEffect, useRef, useState } from "react";

type MediaKind = "mobile" | "web" | "responsive" | "desktop-app";
type FridgePhase = "closed" | "opening" | "search" | "present" | "closing";

type IntroNote = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  symbol: string;
};

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  detail: string;
  tags: string[];
  href?: string;
  download?: {
    primary: string;
    zip?: string;
    filename: string;
  };
  mediaKind: MediaKind;
  media: {
    desktop?: string;
    mobile?: string;
    app?: string;
  };
};


const introNotes: IntroNote[] = [
  {
    id: "observe",
    number: "01",
    label: "HOW I THINK",
    title: "불편함을 그냥 지나치지 않습니다.",
    description: "한 번 더 눌러야 하거나, 매번 반복해야 하는 순간을 보면 왜 그런지 먼저 생각합니다.",
    symbol: "?",
  },
  {
    id: "build",
    number: "02",
    label: "HOW I BUILD",
    title: "화면에서 끝내지 않습니다.",
    description: "프론트엔드를 중심으로 필요한 API와 AI를 연결해 실제로 동작하고 배포되는 형태까지 만듭니다.",
    symbol: "+",
  },
  {
    id: "flow",
    number: "03",
    label: "WHAT I CARE ABOUT",
    title: "쓰는 사람의 흐름을 중요하게 봅니다.",
    description: "기능을 많이 넣기보다 처음 들어온 사람이 이해하고 자연스럽게 사용할 수 있는지를 먼저 봅니다.",
    symbol: "→",
  },
  {
    id: "play",
    number: "04",
    label: "WHAT I ENJOY",
    title: "조금 엉뚱한 아이디어도 좋아합니다.",
    description: "생활 속 작은 불편이나 재미있는 상상을 실제로 만져볼 수 있는 제품으로 만드는 걸 좋아합니다.",
    symbol: "✦",
  },
];

const projects: Project[] = [
  {
    id: "flowmark",
    number: "01",
    title: "Flowmark",
    category: "WEB + MOBILE",
    summary: "중요한 시장 흐름을 빠르게 확인하는 경제 뉴스 서비스",
    description:
      "기존 NEWDAM을 리디자인해, 쏟아지는 경제 뉴스 속에서 지금 먼저 봐야 할 이슈와 관련 종목을 더 빠르게 파악할 수 있도록 만든 서비스입니다.",
    detail:
      "뉴스를 많이 보여주는 것보다 사용자가 시장의 흐름을 놓치지 않도록 우선순위와 맥락을 정리하는 데 집중했습니다. 웹과 모바일 모두에서 핵심 이슈와 신호를 빠르게 읽을 수 있도록 설계했습니다.",
    tags: ["Next.js", "Responsive", "Market", "News"],
    href: "https://j-flowmark.vercel.app/",
    mediaKind: "responsive",
    media: {
      desktop: "/projects/flowmark.jpg",
      mobile: "/projects/flowmark-mobile.png",
    },
  },
  {
    id: "bap",
    number: "02",
    title: "BAP.P",
    category: "MOBILE FIRST",
    summary: "밥 프레지던트 — 식사 선택을 더 재미있게 만드는 모바일 중심 서비스",
    description:
      "매번 반복되는 메뉴 고민을 조금 더 가볍고 재미있게 해결하기 위해 만든 서비스입니다.",
    detail:
      "손에 들고 바로 사용하는 상황을 중심으로 설계한 모바일 퍼스트 제품입니다. 카드와 선택 흐름이 작은 화면에서도 빠르고 자연스럽게 이어지도록 구성했습니다.",
    tags: ["Next.js", "Mobile First", "Interaction", "Utility"],
    href: "https://bap-p.vercel.app/",
    mediaKind: "mobile",
    media: { mobile: "/projects/bap-mobile.jpg" },
  },
  {
    id: "usagi",
    number: "03",
    title: "USAGI",
    category: "MOBILE FIRST",
    summary: "우리 사이의 기류를 해석하는 AI 관계 분석 서비스",
    description:
      "대화 데이터를 바탕으로 커뮤니케이션 패턴과 관계의 흐름을 리포트 형태로 보여주는 AI 기반 서비스입니다.",
    detail:
      "사용자가 실제 대화를 가져오고 결과를 읽는 흐름을 모바일 화면에 맞춰 설계했습니다. 분석 결과를 복잡한 수치보다 친근하고 읽기 쉬운 리포트로 전달하는 데 집중했습니다.",
    tags: ["AI", "Mobile First", "Next.js", "Analysis"],
    href: "https://usagivico.vercel.app/",
    mediaKind: "mobile",
    media: { mobile: "/projects/usagi-mobile.jpg" },
  },
  {
    id: "folder-tree",
    number: "04",
    title: "Folder Tree",
    category: "WEB ONLY",
    summary: "폴더의 구조만 빠르게 복제하는 웹 전용 도구",
    description:
      "기존 폴더 안의 파일은 제외하고 디렉터리 구조만 분석해 새로운 빈 폴더 구조로 만들어주는 서비스입니다.",
    detail:
      "폴더 선택과 구조 확인이 중요한 도구라 넓은 화면의 웹 사용성을 중심으로 설계했습니다. 학교·회사·반복 업무에서 동일한 빈 폴더 트리를 빠르게 다시 만들 수 있습니다.",
    tags: ["Next.js", "TypeScript", "Desktop Web", "Utility"],
    href: "https://foldertree99.vercel.app/",
    mediaKind: "web",
    media: { desktop: "/projects/folder-tree.jpg" },
  },
  {
    id: "file-bowling",
    number: "05",
    title: "File Bowling",
    category: "DESKTOP APP",
    summary: "바탕화면의 파일을 볼링처럼 날리는 Windows 설치형 프로그램",
    description:
      "실제 파일 위치는 건드리지 않고, 데스크톱 위 아이콘을 물리 오브젝트처럼 굴려 잠깐의 재미를 주는 Windows용 인터랙티브 프로그램입니다.",
    detail:
      "웹이 아니라 실제 데스크톱 환경에서 동작하는 설치형 제품입니다. 트레이, 단축키, 멀티모니터, 아이콘 충돌과 복귀 같은 데스크톱 전용 경험을 중심으로 설계했습니다.",
    tags: ["Desktop App", "Windows", "Tauri", "Interaction"],
    download: {
      primary: "/downloads/File-Bowling-0.1.0-x64-setup.exe",
      zip: "/downloads/File-Bowling-0.1.0-x64-setup.zip",
      filename: "File Bowling_0.1.0_x64-setup.exe",
    },
    mediaKind: "desktop-app",
    media: { app: "/projects/file-bowling.png" },
  },
];

function ArrowUpRight() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectMedia({ project, modal = false }: { project: Project; modal?: boolean }) {
  const desktop = project.media.desktop;
  const mobile = project.media.mobile;
  const app = project.media.app;
  const cls = `project-media media-${project.mediaKind} media-project-${project.id}${modal ? " is-modal" : ""}`;

  if (project.mediaKind === "mobile") {
    return (
      <div className={cls}>
        <div className="phone-frame">
          <span className="phone-notch" aria-hidden="true" />
          {mobile && <img src={mobile} alt={`${project.title} 모바일 화면`} loading="lazy" decoding="async" />}
        </div>
        <span className="media-label">MOBILE EXPERIENCE</span>
      </div>
    );
  }

  if (project.mediaKind === "responsive") {
    return (
      <div className={cls}>
        <div className="browser-frame responsive-browser">
          <div className="browser-chrome" aria-hidden="true"><i /><i /><i /></div>
          {desktop && <img src={desktop} alt={`${project.title} 웹 화면`} loading="lazy" decoding="async" />}
        </div>
        <div className="phone-frame responsive-phone">
          <span className="phone-notch" aria-hidden="true" />
          {mobile && <img src={mobile} alt={`${project.title} 모바일 화면`} loading="lazy" decoding="async" />}
        </div>
        <span className="media-label">WEB + MOBILE</span>
      </div>
    );
  }

  if (project.mediaKind === "desktop-app") {
    return (
      <div className={cls}>
        <div className="desktop-app-frame">
          <div className="desktop-app-bar">
            <span>{project.title}</span>
            <span aria-hidden="true">— □ ×</span>
          </div>
          {app && <img src={app} alt={`${project.title} 데스크톱 프로그램 화면`} loading="lazy" decoding="async" />}
        </div>
        <span className="media-label">WINDOWS DESKTOP APP</span>
      </div>
    );
  }

  return (
    <div className={cls}>
      <div className="browser-frame">
        <div className="browser-chrome" aria-hidden="true"><i /><i /><i /></div>
        {desktop && <img src={desktop} alt={`${project.title} 웹 화면`} loading="lazy" decoding="async" />}
      </div>
      <span className="media-label">DESKTOP WEB</span>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [introNoteIndex, setIntroNoteIndex] = useState(-1);
  const [fridgePhase, setFridgePhase] = useState<FridgePhase>("closed");
  const fridgeTimers = useRef<number[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [selected]);

  useEffect(() => () => {
    fridgeTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const introNote = introNoteIndex >= 0 ? introNotes[introNoteIndex] : null;
  const fridgeBusy = fridgePhase === "opening" || fridgePhase === "search" || fridgePhase === "closing";
  const fridgeIsOpen = fridgePhase === "present" || fridgePhase === "search" || fridgePhase === "opening";

  const clearFridgeTimers = () => {
    fridgeTimers.current.forEach((timer) => window.clearTimeout(timer));
    fridgeTimers.current = [];
  };

  const runFridgeSequence = (steps: Array<{ after: number; phase: FridgePhase; advance?: boolean }>) => {
    clearFridgeTimers();
    steps.forEach(({ after, phase, advance }) => {
      fridgeTimers.current.push(window.setTimeout(() => {
        if (advance) setIntroNoteIndex((current) => (current + 1) % introNotes.length);
        setFridgePhase(phase);
      }, after));
    });
  };

  const openAndRetrieve = () => {
    if (fridgeBusy || fridgePhase !== "closed") return;
    setFridgePhase("opening");
    runFridgeSequence([
      { after: 360, phase: "search" },
      { after: 860, phase: "present", advance: true },
    ]);
  };

  const retrieveNext = () => {
    if (fridgeBusy || !fridgeIsOpen) return;
    setFridgePhase("search");
    runFridgeSequence([{ after: 520, phase: "present", advance: true }]);
  };

  const closeFridge = () => {
    if (fridgeBusy || !fridgeIsOpen) return;
    setFridgePhase("closing");
    runFridgeSequence([{ after: 360, phase: "closed" }]);
  };

  const handleFridgeClick = () => {
    if (fridgePhase === "closed") openAndRetrieve();
    else closeFridge();
  };

  const handleHintClick = () => {
    if (fridgePhase === "closed") openAndRetrieve();
    else retrieveNext();
  };

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="홈으로 이동">AHN JUNGHYEON</a>
        <nav aria-label="주요 메뉴"><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
      </header>

      <section className="hero hero-playground" id="top">
        <div className="hero-kicker"><span className="live-dot" /> PRODUCT BUILDER · FRONTEND DEVELOPER</div>

        <div className="hero-stage">
          <div className="hero-statement">
            <p className="hero-eyebrow">AHN JUNGHYEON · SEOUL</p>
            <h1>생각한 건,<span>직접 만들어봅니다.</span></h1>
            <p className="hero-subcopy hero-personal-copy">
              프론트엔드 개발을 중심으로, 떠오른 생각을 실제로 만져볼 수 있는 형태까지 만드는 일을 좋아합니다.
              <strong> 냉장고를 열면 제가 어떤 방식으로 생각하고 만드는지 하나씩 꺼내볼 수 있습니다.</strong>
            </p>
            <p className="hero-signature">A FEW THINGS ABOUT ME, KEPT COOL.</p>
          </div>

          <div className={`playground fridge-playground phase-${fridgePhase}`} aria-live="polite">
            <div className="fridge-caption">
              <span>IDEA STORAGE · ABOUT ME</span>
              <strong>{introNote ? `${introNote.number} / ${String(introNotes.length).padStart(2, "0")}` : "OPEN THE FRIDGE"}</strong>
            </div>

            <div className="fridge-scene">
              <button
                type="button"
                className="fridge-button"
                onClick={handleFridgeClick}
                disabled={fridgeBusy}
                aria-label={fridgePhase === "closed" ? "냉장고를 열고 소개 메모 꺼내기" : "열려 있는 냉장고 닫기"}
                aria-expanded={fridgeIsOpen}
              >
                <span className="fridge-shell">
                  <span className="fridge-inner">
                    <span className="fridge-shelf shelf-one" /><span className="fridge-shelf shelf-two" />
                    <span className="stored-idea idea-one" /><span className="stored-idea idea-two" /><span className="stored-idea idea-three" />
                  </span>
                  <span className="fridge-door">
                    <span className="fridge-handle" /><span className="fridge-badge">IDEAS</span>
                    <span className="fridge-note">next idea?</span><span className="fridge-magnet" aria-hidden="true" />
                  </span>
                  <span className="fridge-bottom-line" />
                </span>
              </button>

              <button
                type="button"
                className="fridge-builder"
                onClick={retrieveNext}
                disabled={fridgeBusy || fridgePhase === "closed"}
                aria-label={fridgePhase === "closed" ? "냉장고를 먼저 열어주세요" : "캐릭터를 눌러 다음 소개 메모 꺼내기"}
              >
                <span className="builder-head"><span className="builder-eye left" /><span className="builder-eye right" /></span>
                <span className="builder-body" /><span className="builder-arm left" /><span className="builder-arm right" />
                <span className="builder-leg left" /><span className="builder-leg right" />
                <span className="presented-product"><span className="presented-icon">{introNote ? introNote.symbol : "+"}</span></span>
              </button>
            </div>

            <div className={`hero-product-result ${introNote ? "is-visible" : ""}`}>
              {introNote ? (
                <>
                  <span className="hero-product-number">{introNote.label}</span>
                  <strong className="hero-about-title">{introNote.title}</strong>
                  <p>{introNote.description}</p>
                </>
              ) : (
                <>
                  <span className="hero-product-number">A LITTLE ABOUT ME.</span>
                  <strong>냉장고를 열어보세요.</strong>
                  <p>캐릭터가 제 생각과 만드는 방식에 대한 메모를 하나씩 꺼내드립니다.</p>
                </>
              )}
            </div>

            <button type="button" className="playground-hint" onClick={handleHintClick} disabled={fridgeBusy}>
              {fridgePhase === "closed" ? "OPEN THE FRIDGE" : fridgeBusy ? "LOOKING..." : "CHARACTER = NEXT · FRIDGE = CLOSE"} <span>↻</span>
            </button>
          </div>
        </div>
        <a className="hero-scroll" href="#projects">SEE WHAT I BUILT <span>↓</span></a>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-heading side-project-heading">
          <h2>SIDE PROJECT</h2>
          <p>작게 시작해, 실제로 사용할 수 있는 형태까지 만든 프로젝트들입니다.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card project-card-${project.mediaKind}`} key={project.id}>
              <div className="project-card-head">
                <div className="project-title-line"><span>{project.number}</span><h3>{project.title}</h3></div>
                <span className="project-platform">{project.category}</span>
              </div>
              <button className="project-visual" type="button" onClick={() => setSelected(project)} aria-label={`${project.title} 상세 보기`}>
                <ProjectMedia project={project} />
                <span className="visual-overlay">VIEW</span>
              </button>
              <div className="project-card-foot">
                <p>{project.summary}</p>
                <div className="project-actions">
                  <button type="button" onClick={() => setSelected(project)}>Info</button>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer">Open <ArrowUpRight /></a>
                  ) : project.download ? (
                    <a href={project.download.primary} download={project.download.filename}>Download ↓</a>
                  ) : (
                    <span className="coming-soon">Windows app</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p>CONTACT</p><h2>같이 만들어보고 싶은 아이디어가 있으신가요?</h2>
        <div className="contact-bottom"><p>기획부터 화면, 인터랙션, 구현까지 편하게 이야기하며 함께 만들어갑니다.</p><a href="mailto:your-email@example.com">your-email@example.com <ArrowUpRight /></a></div>
      </section>

      <footer><span>© 2026 AHN JUNGHYEON</span><a href="#top">BACK TO TOP ↑</a></footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-topbar">
              <div><span>{selected.number}</span><span className="category-pill active">{selected.category}</span></div>
              <button ref={closeButtonRef} type="button" onClick={() => setSelected(null)} aria-label="모달 닫기">✕</button>
            </div>
            <div className={`modal-image-wrap modal-media-${selected.mediaKind}`}><ProjectMedia project={selected} modal /></div>
            <div className="modal-content">
              <div className="modal-title-block"><h2 id="modal-title">{selected.title}</h2><p>{selected.summary}</p></div>
              <div className="modal-description">
                <p>{selected.description}</p><p>{selected.detail}</p>
                <div className="tag-row">{selected.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
                {selected.href ? (
                  <a className="modal-cta" href={selected.href} target="_blank" rel="noreferrer">서비스 실행하기 <ArrowUpRight /></a>
                ) : selected.download ? (
                  <div className="modal-download-actions">
                    <a className="modal-cta" href={selected.download.primary} download={selected.download.filename}>Windows 설치파일 다운로드 ↓</a>
                    {selected.download.zip && (
                      <a className="modal-download-secondary" href={selected.download.zip} download>ZIP으로 받기</a>
                    )}
                  </div>
                ) : (
                  <div className="modal-cta disabled">WINDOWS INSTALLER</div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
