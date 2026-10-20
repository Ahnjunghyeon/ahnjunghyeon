"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type MediaKind = "mobile" | "web" | "responsive" | "desktop-app";
type NotePhase = "settled" | "switching" | "entering";

type IntroNote = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
};

type Profile = {
  englishName: string;
  roleLabel: string;
  eyebrow: string;
  headlineTop: string;
  headlineBottom: string;
  introTitle: string;
  introParagraphs: string[];
  introHighlight: string;
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
    title: "작은 불편도 그냥 넘기지 않습니다.",
    description: "반복되거나 애매한 흐름을 보면 왜 불편한지 먼저 관찰하고, 더 자연스러운 방식으로 풀어내려 합니다.",
  },
  {
    id: "build",
    number: "02",
    label: "HOW I BUILD",
    title: "아이디어를 실제 서비스까지 연결합니다.",
    description: "UI만 예쁘게 만드는 데서 끝내지 않고, 필요한 로직과 AI를 붙여 직접 쓰고 배포할 수 있는 결과물까지 만듭니다.",
  },
  {
    id: "flow",
    number: "03",
    label: "WHAT I CARE ABOUT",
    title: "처음 들어온 사람의 흐름을 중요하게 봅니다.",
    description: "기능을 많이 넣기보다 처음 보는 사람도 바로 이해하고 움직일 수 있는 구조를 더 중요하게 생각합니다.",
  },
  {
    id: "play",
    number: "04",
    label: "WHAT I ENJOY",
    title: "AI와 바이브코딩으로 빠르게 실험합니다.",
    description: "생활 속 아이디어, 재미있는 상상, 업무 불편함을 빠르게 프로토타입으로 만들고 실제 서비스로 다듬는 과정을 좋아합니다.",
  },
];

const profile: Profile = {
  englishName: "HYEON_BIT",
  roleLabel: "현빗 | AI 바이브코딩",
  eyebrow: "HYEON_BIT / SIDE PROJECT / BUILD",
  headlineTop: "현빗의",
  headlineBottom: "사이드프로젝트 개발 페이지",
  introTitle: "아이디어를 AI와 바이브코딩으로 실제 제품까지 연결합니다.",
  introParagraphs: [
    "프론트엔드를 중심으로 직접 기획하고 만들며, 바로 써볼 수 있는 서비스와 도구를 만드는 것을 좋아합니다.",
    "이 페이지는 이력서보다 결과물과 작업 방식을 먼저 보여주는 현빗의 사이드프로젝트 개발 페이지입니다.",
  ],
  introHighlight: "아래 프로젝트는 그렇게 만들어진 서비스들이고, 이 포스트잇에는 제가 일하는 방식과 생각이 담겨 있습니다.",
};

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

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [introNoteIndex, setIntroNoteIndex] = useState(0);
  const [notePhase, setNotePhase] = useState<NotePhase>("settled");
  const [peelProgress, setPeelProgress] = useState(0);
  const [isDraggingNote, setIsDraggingNote] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const noteTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef<number | null>(null);
  const skipClickRef = useRef(false);

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

  useEffect(() => {
    return () => {
      if (noteTimerRef.current) window.clearTimeout(noteTimerRef.current);
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const introNote = introNotes[introNoteIndex];
  const noteBusy = notePhase !== "settled";

  const stopAnimations = () => {
    if (noteTimerRef.current) {
      window.clearTimeout(noteTimerRef.current);
      noteTimerRef.current = null;
    }
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const animateProgress = (from: number, to: number, duration: number, onComplete?: () => void) => {
    stopAnimations();
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const t = clamp(elapsed / duration, 0, 1);
      const eased = easeOutCubic(t);
      const next = from + (to - from) * eased;
      setPeelProgress(next);

      if (t < 1) {
        animationFrameRef.current = window.requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
        onComplete?.();
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
  };

  const showNextNote = () => {
    setIntroNoteIndex((current) => (current + 1) % introNotes.length);
    setPeelProgress(0);
    setNotePhase("entering");
    noteTimerRef.current = window.setTimeout(() => {
      setNotePhase("settled");
      noteTimerRef.current = null;
    }, 220);
  };

  const triggerNoteChange = (fromProgress = peelProgress) => {
    if (noteBusy) return;
    setIsDraggingNote(false);
    setNotePhase("switching");
    animateProgress(fromProgress, 1, 420, () => {
      noteTimerRef.current = window.setTimeout(() => {
        showNextNote();
      }, 24);
    });
  };

  const handlePostitClick = () => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
    if (isDraggingNote || noteBusy) return;
    triggerNoteChange(0);
  };

  const handlePostitPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (noteBusy) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const insidePeelZone = offsetX >= rect.width * 0.6 && offsetY >= rect.height * 0.45;
    if (!insidePeelZone) return;

    stopAnimations();
    dragPointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    skipClickRef.current = false;
    setIsDraggingNote(true);
    setNotePhase("settled");
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePostitPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isDraggingNote || dragPointerIdRef.current !== event.pointerId || dragStartXRef.current === null) return;
    const deltaX = Math.max(0, dragStartXRef.current - event.clientX);
    const progress = clamp(deltaX / 140, 0, 1);
    setPeelProgress(progress);
  };

  const handlePostitPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragPointerIdRef.current !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragPointerIdRef.current = null;
    dragStartXRef.current = null;
    setIsDraggingNote(false);

    if (peelProgress >= 0.36) {
      skipClickRef.current = true;
      triggerNoteChange(peelProgress);
    } else {
      skipClickRef.current = true;
      animateProgress(peelProgress, 0, 240, () => {
        setPeelProgress(0);
      });
    }
  };

  const handlePostitPointerCancel = () => {
    dragPointerIdRef.current = null;
    dragStartXRef.current = null;
    setIsDraggingNote(false);
    animateProgress(peelProgress, 0, 180, () => {
      setPeelProgress(0);
    });
  };

  return (
    <main>
      <header className="site-header">
        <div className="site-header-inner page-shell">
          <a className="wordmark" href="#top" aria-label="홈으로 이동">· {profile.englishName}</a>
          <nav aria-label="주요 메뉴"><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
        </div>
      </header>

      <section className="hero hero-notes" id="top">
        <div className="page-shell hero-inner">
          <div className="hero-kicker"><span className="live-dot" /> {profile.roleLabel}</div>

          <div className="hero-stage">
            <div className="hero-statement">
              <p className="hero-eyebrow">{profile.eyebrow}</p>
              <h1>{profile.headlineTop}<span>{profile.headlineBottom}</span></h1>
              <p className="hero-intro-title">{profile.introTitle}</p>
              <div className="hero-subcopy hero-personal-copy">
                {profile.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p><strong>{profile.introHighlight}</strong></p>
              </div>
              <p className="hero-signature">A FEW NOTES ABOUT HYEON_BIT.</p>
            </div>

            <div className={`playground note-playground phase-${notePhase}`} aria-live="polite">
              <div className="notes-caption">
                <span>NOTE BOARD · ABOUT ME</span>
                <strong>{introNote.number} / {String(introNotes.length).padStart(2, "0")}</strong>
              </div>

              <div className="notes-scene">
                <div className="note-board" aria-hidden="true" />
                <button
                  type="button"
                  className={`postit-stack ${isDraggingNote ? "is-dragging" : ""}`}
                  onClick={handlePostitClick}
                  onPointerDown={handlePostitPointerDown}
                  onPointerMove={handlePostitPointerMove}
                  onPointerUp={handlePostitPointerUp}
                  onPointerCancel={handlePostitPointerCancel}
                  disabled={noteBusy}
                  aria-label="포스트잇을 눌러 다음 소개 메모 보기"
                  style={{ ["--peel-progress" as string]: String(peelProgress) }}
                >
                  <span className="postit-under under-one" aria-hidden="true" />
                  <span className="postit-under under-two" aria-hidden="true" />
                  <span className="postit-note">
                    <span className="postit-content">
                      <span className="postit-label">{introNote.label}</span>
                      <strong>{introNote.title}</strong>
                      <p>{introNote.description}</p>
                      <span className="postit-index">{introNote.number}</span>
                    </span>
                    <span className="postit-peel-shadow" aria-hidden="true" />
                    <span className="postit-peel-sheet" aria-hidden="true" />
                  </span>
                </button>
              </div>

              <div className="hero-product-result note-result is-visible">
                <span className="hero-product-number">CLICK OR DRAG THE CORNER</span>
                <strong className="hero-about-title">한 장씩 넘기며 현빗을 소개합니다.</strong>
                <p>오른쪽 아래를 왼쪽으로 살짝 끌어당기거나 포스트잇을 클릭해 다음 메모를 볼 수 있습니다.</p>
              </div>

              <button type="button" className="playground-hint" onClick={() => triggerNoteChange(0)} disabled={noteBusy}>
                NEXT NOTE <span>↑</span>
              </button>
            </div>
          </div>

          <a className="hero-scroll" href="#projects">SEE SIDE PROJECTS <span>↓</span></a>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="page-shell section-shell">
          <div className="section-heading side-project-heading">
            <h2>SIDE PROJECT</h2>
            <p>현빗이 직접 만들고 배포해 본 서비스와 도구들입니다.</p>
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
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="page-shell contact-shell">
          <p>CONTACT</p>
          <h2>현빗과 함께 만들어보고 싶은 아이디어가 있다면 편하게 연락해주세요.</h2>
          <div className="contact-bottom"><p>작은 아이디어부터 실제 서비스 프로토타입까지 함께 이야기할 수 있습니다.</p><a href="mailto:your-email@example.com">your-email@example.com <ArrowUpRight /></a></div>
        </div>
      </section>

      <footer>
        <div className="page-shell footer-shell"><span>© 2026 HYEON_BIT</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

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
