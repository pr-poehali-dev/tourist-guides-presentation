import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { href: "#safety", label: "Безопасность" },
  { href: "#team", label: "Команда" },
  { href: "#gear", label: "Снаряжение" },
  { href: "#service", label: "Сервис" },
  { href: "#prepare", label: "Подготовка" },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-slide min-h-screen text-white font-sans">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "header-scrolled" : "header-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="icon-badge-sm">
              <Icon name="Mountain" size={16} color="#0d1810" />
            </div>
            <div>
              <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--stone)] leading-none">
                Туристическая компания
              </div>
              <div className="font-display text-sm font-semibold text-[var(--amber-light)] leading-tight tracking-wide">
                Стандарты инструктора
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-display text-xs tracking-widest uppercase text-[var(--stone)] hover:text-[var(--amber)] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden text-[var(--stone)] hover:text-[var(--amber)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[rgba(45,82,52,0.4)] bg-[#0d1810]/95 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="font-display text-sm tracking-widest uppercase text-[var(--stone)] hover:text-[var(--amber)] transition-colors text-left py-1"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="hero-bg min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(45,82,52,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="font-display text-xs tracking-[0.35em] uppercase text-[var(--amber)] px-4 py-1.5 border border-[rgba(240,160,32,0.3)] rounded-full">
              Карелия · Активный отдых
            </span>
          </div>

          <h1
            className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.95] mb-6"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}
          >
            СТАНДАРТЫ
            <br />
            <span style={{ color: "var(--amber)" }}>ИНСТРУКТОРА</span>
          </h1>

          <div className="amber-line w-24 mx-auto mb-8" />

          <p className="font-display text-lg text-[var(--stone-light)] max-w-xl mx-auto tracking-wide leading-relaxed mb-12">
            Единые правила работы для обеспечения безопасности, качества и
            профессионализма команды
          </p>

          <div className="flex gap-3 flex-wrap justify-center mb-16">
            {[
              { icon: "Shield", label: "Безопасность" },
              { icon: "Users", label: "Команда" },
              { icon: "Backpack", label: "Снаряжение" },
              { icon: "Star", label: "Сервис" },
              { icon: "ClipboardList", label: "Подготовка" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 card-forest px-4 py-2 rounded-full"
              >
                <Icon name={item.icon} size={14} color="var(--amber)" />
                <span className="font-display text-xs tracking-widest uppercase text-[var(--stone-light)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollTo("#safety")}
            className="flex items-center gap-2 mx-auto text-[var(--stone)] hover:text-[var(--amber)] transition-colors group"
          >
            <span className="font-display text-xs tracking-widest uppercase">
              Начать изучение
            </span>
            <Icon name="ChevronDown" size={16} />
          </button>
        </div>
      </section>

      {/* SECTION 1: SAFETY */}
      <section id="safety" className="py-24 px-6 relative overflow-hidden">
        <div className="big-number-bg">01</div>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            number="01"
            label="Раздел 01"
            title={
              <>
                БЕЗОПАСНОСТЬ &amp;
                <br />
                <span className="text-[var(--amber)]">
                  ЭКСТРЕННЫЕ СИТУАЦИИ
                </span>
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              {
                title: "Брифинг по безопасности",
                text: "Обязательный инструктаж перед каждым выходом. Убедитесь, что каждый турист понял правила.",
                icon: "AlertCircle",
              },
              {
                title: "Постоянная оценка рисков",
                text: "Оценивайте маршрут, погоду и состояние группы непрерывно на протяжении всего тура.",
                icon: "Eye",
              },
              {
                title: "Связь и навигация",
                text: "Иметь при себе заряженную рацию, спутниковый маяк и актуальные карты маршрута.",
                icon: "Radio",
              },
              {
                title: "Протокол SOS",
                text: "При ЧП: стоп → оценка → первая помощь → связь с базой → эвакуация по плану.",
                icon: "Siren",
              },
              {
                title: "Аптечка и обучение",
                text: "Каждый инструктор обязан иметь аптечку и сертификат по первой помощи (обновление раз в год).",
                icon: "HeartPulse",
              },
              {
                title: "Счёт группы",
                text: "Пересчитывайте участников при каждой остановке. Никто не должен остаться позади.",
                icon: "Users",
              },
            ].map((r, i) => (
              <div key={i} className="card-forest rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 icon-badge-sm">
                  <Icon name={r.icon} size={18} color="#0d1810" />
                </div>
                <div className="font-display text-sm font-semibold text-white tracking-wide mb-2">
                  {r.title}
                </div>
                <div className="text-sm text-[var(--stone-light)] leading-relaxed">
                  {r.text}
                </div>
              </div>
            ))}
          </div>

          <div className="card-forest rounded-xl p-6 border-l-4 border-[var(--amber)]">
            <div className="flex items-start gap-4">
              <Icon name="Zap" size={20} color="var(--amber)" />
              <p className="text-[var(--stone-light)] text-sm leading-relaxed">
                <strong className="text-white">
                  При любой чрезвычайной ситуации:
                </strong>{" "}
                Ваша уверенность и быстрые действия спасают жизни. Все
                инструкторы должны быть готовы к эвакуации в любой момент.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TEAM */}
      <section id="team" className="py-24 px-6 relative overflow-hidden bg-[#0f1f12]">
        <div className="big-number-bg">02</div>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            number="02"
            label="Раздел 02"
            title={
              <>
                ВЗАИМОДЕЙСТВИЕ
                <br />
                <span className="text-[var(--amber)]">В КОМАНДЕ</span>
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "MessageCircle",
                title: "Коммуникация",
                color: "#f0a020",
                items: [
                  "Единый канал связи для всей команды",
                  "Ежедневный брифинг перед выходом",
                  "Отчёт руководителю после тура",
                  "Открытость к обратной связи",
                ],
              },
              {
                icon: "Target",
                title: "Зоны ответственности",
                color: "#4ade80",
                items: [
                  "Чёткое распределение ролей в группе",
                  "Ведущий и замыкающий инструктор",
                  "Контроль темпа и состояния участников",
                  "Взаимная поддержка в сложных ситуациях",
                ],
              },
              {
                icon: "RefreshCw",
                title: "Смена инструктора",
                color: "#60a5fa",
                items: [
                  "Передача информации о группе",
                  "Состояние снаряжения и аптечки",
                  "Особенности участников (здоровье, опыт)",
                  "Статус выполнения маршрута",
                ],
              },
            ].map((c, i) => (
              <div key={i} className="card-forest rounded-xl p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${c.color}22`,
                    border: `1px solid ${c.color}44`,
                  }}
                >
                  <Icon name={c.icon} size={22} color={c.color} />
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-4 tracking-wide">
                  {c.title}
                </h3>
                <ul className="space-y-2">
                  {c.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: c.color }}
                      />
                      <span className="text-sm text-[var(--stone-light)] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Team principle */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "Heart",
                label: "Уважение",
                text: "К каждому участнику команды и туристу",
              },
              {
                icon: "Handshake",
                label: "Взаимопомощь",
                text: "Готовность поддержать коллегу в любой момент",
              },
              {
                icon: "TrendingUp",
                label: "Развитие",
                text: "Делитесь опытом и учитесь у коллег",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 card-forest rounded-xl px-5 py-4"
              >
                <Icon name={p.icon} size={20} color="var(--amber)" />
                <div>
                  <div className="font-display text-sm font-semibold text-[var(--amber-light)] tracking-wide">
                    {p.label}
                  </div>
                  <div className="text-xs text-[var(--stone)] leading-snug">
                    {p.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: GEAR */}
      <section id="gear" className="py-24 px-6 relative overflow-hidden">
        <div className="big-number-bg">03</div>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            number="03"
            label="Раздел 03"
            title={
              <>
                СНАРЯЖЕНИЕ &amp;
                <br />
                <span className="text-[var(--amber)]">ОБОРУДОВАНИЕ</span>
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: "Shield",
                title: "Личное снаряжение",
                color: "#f0a020",
                items: [
                  "Каска и защитное снаряжение",
                  "Спасательный жилет (водные туры)",
                  "Навигатор / карты маршрута",
                  "Фонарь + запасные батарейки",
                  "Нож и мультитул",
                ],
              },
              {
                icon: "Backpack",
                title: "Групповое снаряжение",
                color: "#4ade80",
                items: [
                  "Аптечка первой помощи (полная)",
                  "Спутниковый маяк / рация",
                  "Палатки и укрытия на группу",
                  "Верёвки и карабины (скалолазание)",
                  "Запас еды и воды на 2 дня",
                ],
              },
              {
                icon: "Wrench",
                title: "Техническое обслуживание",
                color: "#60a5fa",
                items: [
                  "Проверка снаряжения перед каждым туром",
                  "Ведение журнала состояния оборудования",
                  "Сдача снаряжения на проверку по графику",
                  "Замена при износе без согласования не допускается",
                ],
              },
              {
                icon: "ClipboardCheck",
                title: "Чеклист перед выходом",
                color: "#f472b6",
                items: [
                  "Проверить аптечку (срок годности, комплектность)",
                  "Зарядить все устройства связи",
                  "Проверить погодный прогноз",
                  "Уточнить контакты экстренных служб района",
                ],
              },
            ].map((b, i) => (
              <div key={i} className="card-forest rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${b.color}22`,
                      border: `1px solid ${b.color}44`,
                    }}
                  >
                    <Icon name={b.icon} size={18} color={b.color} />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-white tracking-wide">
                    {b.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {b.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Icon
                        name="Check"
                        size={13}
                        color="var(--amber)"
                        className="mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-[var(--stone-light)] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="card-forest rounded-xl p-6 border-l-4 border-[var(--amber)]">
            <div className="flex items-start gap-4">
              <Icon name="AlertTriangle" size={20} color="var(--amber)" />
              <p className="text-[var(--stone-light)] text-sm leading-relaxed">
                <strong className="text-white">Важно:</strong> Неисправное или
                неполное снаряжение — основание для отмены тура. Безопасность
                группы всегда важнее расписания.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICE */}
      <section id="service" className="py-24 px-6 relative overflow-hidden bg-[#0f1f12]">
        <div className="big-number-bg">04</div>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            number="04"
            label="Раздел 04"
            title={
              <>
                СТАНДАРТЫ
                <br />
                <span className="text-[var(--amber)]">СЕРВИСА</span>
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: "Smile",
                label: "Приветствие",
                text: "Встречать туристов улыбкой, представиться и рассказать о программе дня до начала тура.",
              },
              {
                icon: "MessageSquare",
                label: "Обратная связь",
                text: "Собирать отзывы в конце каждого дня. Реагировать на замечания оперативно и без оправданий.",
              },
              {
                icon: "Clock",
                label: "Пунктуальность",
                text: "Инструктор прибывает на место за 20 минут до старта. Опоздание — исключение, а не норма.",
              },
              {
                icon: "BookOpen",
                label: "Знание маршрута",
                text: "Рассказывать об истории мест, природе и культуре Карелии. Подготовка — обязательна.",
              },
              {
                icon: "Camera",
                label: "Фотосопровождение",
                text: "Делать памятные фотографии группы в ключевых точках маршрута. Отправлять в тот же день.",
              },
              {
                icon: "ThumbsUp",
                label: "Личный пример",
                text: "Инструктор — лицо компании. Внешний вид, речь и поведение соответствуют высокому стандарту.",
              },
            ].map((s, i) => (
              <div key={i} className="card-forest rounded-xl p-5 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="icon-badge-sm">
                    <Icon name={s.icon} size={16} color="#0d1810" />
                  </div>
                </div>
                <div>
                  <div className="font-display text-xs font-semibold text-[var(--amber)] tracking-wide mb-1">
                    {s.label}
                  </div>
                  <div className="text-sm text-[var(--stone-light)] leading-relaxed">
                    {s.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NPS bar */}
          <div className="card-forest rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-sm font-semibold text-white tracking-wide">
                Целевой рейтинг удовлетворённости
              </div>
              <div className="font-display text-2xl font-bold text-[var(--amber)]">
                4.8 / 5.0
              </div>
            </div>
            <div className="h-2 rounded-full bg-[rgba(180,196,182,0.1)]">
              <div
                className="h-2 rounded-full"
                style={{
                  width: "96%",
                  background:
                    "linear-gradient(90deg, var(--amber), var(--amber-light))",
                }}
              />
            </div>
            <div className="mt-3 text-xs text-[var(--stone)]">
              Оценки собираются после каждого тура через форму обратной связи
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PREPARE */}
      <section id="prepare" className="py-24 px-6 relative overflow-hidden">
        <div className="big-number-bg">05</div>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            number="05"
            label="Раздел 05"
            title={
              <>
                ПОДГОТОВКА
                <br />
                <span className="text-[var(--amber)]">К ТУРУ</span>
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                period: "За 7 дней",
                color: "#60a5fa",
                tasks: [
                  "Изучить маршрут и альтернативные пути",
                  "Проверить прогноз погоды на период тура",
                  "Подтвердить состав и особенности группы",
                  "Проверить наличие всего снаряжения",
                  "Связаться с туристами: что взять с собой",
                ],
              },
              {
                period: "За 1 день",
                color: "#f0a020",
                tasks: [
                  "Финальная проверка аптечки и связи",
                  "Уточнить точку сбора и время старта",
                  "Зарядить все устройства",
                  "Распечатать карты маршрута (резерв)",
                  "Изучить экстренные контакты района",
                ],
              },
              {
                period: "В день тура",
                color: "#4ade80",
                tasks: [
                  "Прибыть за 20 минут до старта",
                  "Провести брифинг по безопасности",
                  "Пересчитать группу и проверить снаряжение",
                  "Зафиксировать состав группы в журнале",
                  "Уведомить базу о начале маршрута",
                ],
              },
            ].map((stage, i) => (
              <div key={i} className="card-forest rounded-xl p-6">
                <div
                  className="inline-block font-display text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                  style={{
                    color: stage.color,
                    background: `${stage.color}18`,
                    border: `1px solid ${stage.color}33`,
                  }}
                >
                  {stage.period}
                </div>
                <ul className="space-y-3">
                  {stage.tasks.map((t, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-[#0d1810]"
                        style={{ background: stage.color }}
                      >
                        <span className="font-display text-[10px] font-bold">
                          {j + 1}
                        </span>
                      </div>
                      <span className="text-sm text-[var(--stone-light)] leading-relaxed">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* After tour */}
          <div className="card-forest rounded-xl p-6 border-l-4 border-[#4ade80]">
            <div className="flex items-start gap-4">
              <Icon name="CheckCircle" size={20} color="#4ade80" />
              <div>
                <div className="font-display text-sm font-semibold text-white tracking-wide mb-2">
                  После тура
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "Отчёт руководителю в течение 2 часов",
                    "Сдать снаряжение на хранение в надлежащем состоянии",
                    "Отправить фото туристам и запросить отзыв",
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="text-sm text-[var(--stone-light)] flex items-start gap-2"
                    >
                      <Icon
                        name="ArrowRight"
                        size={13}
                        color="#4ade80"
                        className="mt-0.5 flex-shrink-0"
                      />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1409] border-t border-[rgba(45,82,52,0.4)] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="icon-badge-sm">
                <Icon name="Mountain" size={16} color="#0d1810" />
              </div>
              <div>
                <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--stone)]">
                  Туристическая компания
                </div>
                <div className="font-display text-sm font-semibold text-[var(--amber-light)]">
                  Стандарты инструктора
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="font-display text-[10px] tracking-widest uppercase text-[var(--stone)] hover:text-[var(--amber)] transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="text-[var(--stone)] text-xs text-center md:text-right">
              <div>Карелия · Активный отдых</div>
              <div className="mt-1 text-[var(--stone)]/60">
                Внутренний документ команды
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(45,82,52,0.3)] text-center">
            <p className="text-[var(--stone)] text-xs tracking-widest uppercase">
              Стандарты разработаны для обеспечения безопасности и качества
              туристического опыта в Карелии
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="font-display text-xs tracking-[0.3em] uppercase text-[var(--amber)] mb-2">
        {label}
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
        {title}
      </h2>
      <div className="amber-line w-16" />
    </div>
  );
}
