import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const SLIDES = [
  { id: 0, shortLabel: "Вступление" },
  { id: 1, shortLabel: "Безопасность" },
  { id: 2, shortLabel: "Команда" },
  { id: 3, shortLabel: "Снаряжение" },
  { id: 4, shortLabel: "Сервис" },
  { id: 5, shortLabel: "Подготовка" },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState("0");

  const goTo = useCallback((idx: number) => {
    if (idx === current) return;
    setAnimKey(`${idx}-${Date.now()}`);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    if (current < SLIDES.length - 1) goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const progress = (current / (SLIDES.length - 1)) * 100;

  const slides = [
    <SlideHero key="hero" />,
    <SlideSafety key="safety" />,
    <SlideTeam key="team" />,
    <SlideGear key="gear" />,
    <SlideService key="service" />,
    <SlidePrepare key="prepare" />,
  ];

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-slide select-none">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 h-[3px]"
        style={{ background: "rgba(180,196,182,0.1)" }}>
        <div
          className="absolute top-0 left-0 h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, #f0a020, #f5b84a)" }}
        />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="icon-badge">
            <Icon name="Mountain" size={20} color="#0d1810" />
          </div>
          <div>
            <div className="font-display text-xs tracking-[0.2em] uppercase text-[var(--stone)] leading-none">Туристическая компания</div>
            <div className="font-display text-sm font-semibold text-[var(--amber-light)] leading-tight tracking-wide">Стандарты инструктора</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-[var(--amber)]">{String(current + 1).padStart(2, "0")}</span>
          <span className="text-[var(--stone)] text-sm">/</span>
          <span className="text-[var(--stone)] text-sm font-display">{String(SLIDES.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Slide content */}
      <div key={animKey} className="slide-enter absolute inset-0">
        {slides[current]}
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5">
        <div className="flex gap-2 items-center">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`nav-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
              title={s.shortLabel}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(180,196,182,0.2)] text-[var(--stone)] hover:border-[var(--amber)] hover:text-[var(--amber)] transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          <button
            onClick={next}
            disabled={current === SLIDES.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--amber)] text-[#0d1810] hover:bg-[var(--amber-light)] transition-all font-bold disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 0: HERO ─── */
function SlideHero() {
  return (
    <div className="hero-bg w-full h-full flex flex-col items-center justify-center text-center px-8 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(45,82,52,0.2) 0%, transparent 70%)" }} />

      <div className="anim-fade-up delay-1 mb-4">
        <span className="font-display text-xs tracking-[0.35em] uppercase text-[var(--amber)] px-4 py-1.5 border border-[rgba(240,160,32,0.3)] rounded-full">
          Карелия · Активный отдых
        </span>
      </div>

      <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-[0.95] mb-6 anim-fade-up delay-2"
        style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}>
        СТАНДАРТЫ<br />
        <span style={{ color: "var(--amber)" }}>ИНСТРУКТОРА</span>
      </h1>

      <div className="amber-line w-24 mx-auto mb-6 anim-fade-in delay-3" />

      <p className="font-display text-lg text-[var(--stone-light)] max-w-lg anim-fade-up delay-3 tracking-wide leading-relaxed">
        Единые правила работы для обеспечения безопасности,
        качества и профессионализма команды
      </p>

      <div className="mt-12 flex gap-3 flex-wrap justify-center anim-fade-up delay-5">
        {[
          { icon: "Shield", label: "Безопасность" },
          { icon: "Users", label: "Команда" },
          { icon: "Backpack", label: "Снаряжение" },
          { icon: "Star", label: "Сервис" },
          { icon: "ClipboardList", label: "Подготовка" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 card-forest px-4 py-2 rounded-full">
            <Icon name={item.icon} size={14} color="var(--amber)" />
            <span className="font-display text-xs tracking-widest uppercase text-[var(--stone-light)]">{item.label}</span>
          </div>
        ))}
      </div>

      <p className="absolute bottom-20 text-[var(--stone)] text-xs tracking-widest uppercase anim-fade-in delay-7">
        Стрелки клавиатуры или кнопки ниже для навигации
      </p>
    </div>
  );
}

/* ─── SLIDE 1: SAFETY ─── */
function SlideSafety() {
  const rules = [
    { title: "Брифинг по безопасности", text: "Обязательный инструктаж перед каждым выходом. Убедитесь, что каждый турист понял правила." },
    { title: "Постоянная оценка рисков", text: "Оценивайте маршрут, погоду и состояние группы непрерывно на протяжении всего тура." },
    { title: "Связь и навигация", text: "Иметь при себе заряженную рацию, спутниковый маяк и актуальные карты маршрута." },
    { title: "Протокол SOS", text: "При ЧП: стоп → оценка → первая помощь → связь с базой → эвакуация по плану." },
    { title: "Аптечка и обучение", text: "Каждый инструктор обязан иметь аптечку и сертификат по первой помощи (обновление раз в год)." },
    { title: "Счёт группы", text: "Пересчитывайте участников при каждой остановке. Никто не должен остаться позади." },
  ];

  return (
    <div className="bg-slide w-full h-full flex flex-col justify-center px-10 md:px-20 pt-20 pb-16 relative overflow-hidden">
      <div className="big-number">01</div>
      <div className="anim-fade-up delay-1 mb-2">
        <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--amber)]">Раздел 01</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 anim-fade-up delay-2 leading-tight">
        БЕЗОПАСНОСТЬ &amp;<br />
        <span className="text-[var(--amber)]">ЭКСТРЕННЫЕ СИТУАЦИИ</span>
      </h2>
      <div className="amber-line w-16 mb-6 anim-fade-in delay-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
        {rules.map((r, i) => (
          <div key={i} className={`rule-item anim-fade-up delay-${Math.min(i + 3, 8)}`} style={{ animationFillMode: "both" }}>
            <div className="font-display text-sm font-semibold text-white tracking-wide mb-0.5">{r.title}</div>
            <div className="text-sm text-[var(--stone-light)] leading-relaxed">{r.text}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 card-forest rounded-xl px-6 py-4 max-w-4xl anim-fade-up delay-8" style={{ animationFillMode: "both", borderColor: "rgba(240,160,32,0.35)" }}>
        <div className="flex items-center gap-3">
          <Icon name="AlertTriangle" size={16} color="var(--amber)" />
          <p className="text-sm text-[var(--stone-light)]">
            <span className="text-white font-semibold">Главное правило:</span> безопасность группы важнее любого расписания и программы тура. Нет компромиссов.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 2: TEAM ─── */
function SlideTeam() {
  const blocks = [
    {
      icon: "MessageCircle",
      title: "Коммуникация с туристами",
      items: ["Приветствие и знакомство при первом контакте", "Открытый, доброжелательный тон без давления", "Активное слушание запросов и опасений группы", "Чёткие инструкции без сленга"],
    },
    {
      icon: "Users",
      title: "Работа в команде",
      items: ["Разделение зон ответственности до выхода", "Отметки с партнёром каждые 30 минут", "Единый голос команды — решения совместно", "Поддержка коллег без публичной критики"],
    },
    {
      icon: "Heart",
      title: "Работа с группой",
      items: ["Учёт физической подготовки каждого участника", "Темп по самому медленному участнику", "Вовлечение отстающих в активность", "Нейтральное разрешение конфликтов"],
    },
  ];

  return (
    <div className="bg-slide w-full h-full flex flex-col justify-center px-10 md:px-20 pt-20 pb-16 relative overflow-hidden">
      <div className="big-number">02</div>
      <div className="anim-fade-up delay-1 mb-2">
        <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--amber)]">Раздел 02</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 anim-fade-up delay-2 leading-tight">
        ВЗАИМОДЕЙСТВИЕ &amp;<br />
        <span className="text-[var(--amber)]">КОМАНДНАЯ РАБОТА</span>
      </h2>
      <div className="amber-line w-16 mb-6 anim-fade-in delay-2" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        {blocks.map((b, i) => (
          <div key={i} className={`card-forest rounded-xl p-5 anim-fade-up delay-${i + 3}`} style={{ animationFillMode: "both" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-badge">
                <Icon name={b.icon} size={18} color="#0d1810" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white tracking-wide leading-tight">{b.title}</h3>
            </div>
            <ul className="space-y-2">
              {b.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-[var(--stone-light)]">
                  <span className="text-[var(--amber)] mt-0.5 flex-shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 3: GEAR ─── */
function SlideGear() {
  const categories = [
    { icon: "Package", title: "Личное снаряжение", color: "#f0a020", items: ["Проверка комплектности до выхода", "Техосмотр страховок и карабинов", "Учёт и маркировка позиций"] },
    { icon: "Settings", title: "Обслуживание", color: "#4ade80", items: ["Чистка и сушка после каждого тура", "Плановый осмотр раз в месяц", "Журнал технического состояния"] },
    { icon: "AlertCircle", title: "Неисправности", color: "#fb923c", items: ["Немедленный вывод из оборота", "Красная маркировка + запись в журнал", "Замена до следующего выхода"] },
    { icon: "Archive", title: "Хранение", color: "#38bdf8", items: ["Сухое место, защита от УФ", "Раздельное хранение по категориям", "Инвентаризация после каждого тура"] },
  ];

  return (
    <div className="bg-slide w-full h-full flex flex-col justify-center px-10 md:px-20 pt-20 pb-16 relative overflow-hidden">
      <div className="big-number">03</div>
      <div className="anim-fade-up delay-1 mb-2">
        <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--amber)]">Раздел 03</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 anim-fade-up delay-2 leading-tight">
        СНАРЯЖЕНИЕ &amp;<br />
        <span className="text-[var(--amber)]">ОБОРУДОВАНИЕ</span>
      </h2>
      <div className="amber-line w-16 mb-6 anim-fade-in delay-2" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
        {categories.map((c, i) => (
          <div key={i} className={`card-forest rounded-xl p-5 anim-fade-up delay-${i + 3}`} style={{ animationFillMode: "both" }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${c.color}22`, border: `1px solid ${c.color}44` }}>
              <Icon name={c.icon} size={18} color={c.color} />
            </div>
            <h3 className="font-display text-sm font-semibold text-white mb-3 tracking-wide">{c.title}</h3>
            <ul className="space-y-2">
              {c.items.map((item, j) => (
                <li key={j} className="text-xs text-[var(--stone-light)] leading-snug flex items-start gap-1.5">
                  <span style={{ color: c.color }} className="flex-shrink-0 mt-0.5 text-base leading-none">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 card-forest rounded-xl px-6 py-4 max-w-5xl anim-fade-up delay-7" style={{ animationFillMode: "both", borderColor: "rgba(240,160,32,0.3)" }}>
        <div className="flex items-center gap-3">
          <Icon name="Info" size={16} color="var(--amber)" />
          <p className="text-sm text-[var(--stone-light)]">
            <span className="text-white font-semibold">Ключевой принцип:</span> снаряжение с сомнительным состоянием не используется — только исправное оборудование выходит на маршрут.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 4: SERVICE ─── */
function SlideService() {
  const standards = [
    { icon: "Star", label: "Первое впечатление", text: "Встреча группы по форме, улыбка, чёткое представление команды и программы дня." },
    { icon: "Clock", label: "Пунктуальность", text: "Выход по расписанию. Задержка более 10 минут требует объяснения группе." },
    { icon: "ThumbsUp", label: "Позитивная атмосфера", text: "Инструктор задаёт тон группе. Энтузиазм заразителен — ведите личным примером." },
    { icon: "MessageSquare", label: "Обратная связь", text: "Ежедневный сбор впечатлений группы. Жалобы фиксируются и передаются руководству в день возникновения." },
    { icon: "Award", label: "Внешний вид", text: "Фирменная форма в чистом виде на каждом выходе. Бейдж обязателен." },
    { icon: "Camera", label: "Впечатления клиента", text: "Создавайте запоминающиеся моменты: фото-остановки, интересные факты, сюрпризы на маршруте." },
  ];

  return (
    <div className="bg-slide w-full h-full flex flex-col justify-center px-10 md:px-20 pt-20 pb-16 relative overflow-hidden">
      <div className="big-number">04</div>
      <div className="anim-fade-up delay-1 mb-2">
        <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--amber)]">Раздел 04</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 anim-fade-up delay-2 leading-tight">
        КАЧЕСТВО<br />
        <span className="text-[var(--amber)]">СЕРВИСА</span>
      </h2>
      <div className="amber-line w-16 mb-6 anim-fade-in delay-2" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl">
        {standards.map((s, i) => (
          <div key={i} className={`card-forest rounded-xl p-4 flex gap-3 anim-fade-up delay-${Math.min(i + 3, 8)}`} style={{ animationFillMode: "both" }}>
            <div className="icon-badge flex-shrink-0" style={{ width: 36, height: 36, borderRadius: 8 }}>
              <Icon name={s.icon} size={15} color="#0d1810" />
            </div>
            <div>
              <div className="font-display text-xs font-semibold text-[var(--amber)] tracking-wide mb-1">{s.label}</div>
              <p className="text-xs text-[var(--stone-light)] leading-relaxed">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 5: PREPARE ─── */
function SlidePrepare() {
  const steps = [
    { num: "01", phase: "За 48 часов", items: ["Изучение маршрута и актуальных карт", "Проверка прогноза погоды", "Подтверждение состава группы и особых потребностей"] },
    { num: "02", phase: "За 24 часа", items: ["Полная проверка снаряжения группы", "Подготовка аптечки и аварийного набора", "Брифинг с напарником по распределению ролей"] },
    { num: "03", phase: "День выхода", items: ["Прибытие за 30 мин до старта", "Финальный инструктаж группы по безопасности", "Проверка связи: рация, телефон, маяк"] },
    { num: "04", phase: "После тура", items: ["Возврат и осмотр снаряжения", "Заполнение отчётной формы и журнала", "Обратная связь с руководителем при отклонениях"] },
  ];

  return (
    <div className="bg-slide w-full h-full flex flex-col justify-center px-10 md:px-20 pt-20 pb-16 relative overflow-hidden">
      <div className="big-number">05</div>
      <div className="anim-fade-up delay-1 mb-2">
        <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--amber)]">Раздел 05</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 anim-fade-up delay-2 leading-tight">
        ПОДГОТОВКА<br />
        <span className="text-[var(--amber)]">К ТУРУ</span>
      </h2>
      <div className="amber-line w-16 mb-6 anim-fade-in delay-2" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
        {steps.map((s, i) => (
          <div key={i} className={`card-forest rounded-xl p-5 anim-fade-up delay-${i + 3} relative overflow-hidden`} style={{ animationFillMode: "both" }}>
            <div className="font-display font-bold text-5xl absolute top-2 right-2 leading-none pointer-events-none"
              style={{ color: "rgba(240,160,32,0.07)" }}>{s.num}</div>
            <div className="mb-3">
              <div className="font-display text-xs text-[var(--amber)] tracking-widest uppercase mb-0.5">{s.num}</div>
              <div className="font-display text-sm font-semibold text-white">{s.phase}</div>
            </div>
            <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, var(--amber), transparent)" }} />
            <ul className="space-y-2">
              {s.items.map((item, j) => (
                <li key={j} className="text-xs text-[var(--stone-light)] leading-snug flex items-start gap-1.5">
                  <Icon name="Check" size={11} color="var(--amber)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 card-forest rounded-xl px-6 py-4 max-w-5xl anim-fade-up delay-7" style={{ animationFillMode: "both", borderColor: "rgba(240,160,32,0.3)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="CheckCircle" size={18} color="var(--amber)" />
            <p className="text-sm text-white font-semibold">Ты готов к выходу — действуй уверенно и веди группу к незабываемым впечатлениям!</p>
          </div>
          <span className="font-display text-xs tracking-widest uppercase text-[var(--stone)] hidden md:block">Карелия ждёт</span>
        </div>
      </div>
    </div>
  );
}