"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from "react";
import {
  ArrowRight,
  CalendarCheck,
  CarProfile,
  CheckCircle,
  Clock,
  Engine,
  Gauge,
  GearSix,
  MapPin,
  Phone,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Star,
  SteeringWheel,
  Tire,
  Wrench
} from "@phosphor-icons/react";

const nav = ["Преимущества", "Услуги", "Процесс", "Отзывы", "Контакты"];
const phone = { value: "+7 (981) 790-00-09", href: "tel:+79817900009" };
const address = "Пражская ул., 17Е, Кудрово";
const mapHref = "https://yandex.ru/maps/?text=%D0%9F%D1%80%D0%B0%D0%B6%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB.%2C%2017%D0%95%2C%20%D0%9A%D1%83%D0%B4%D1%80%D0%BE%D0%B2%D0%BE";

const stats = [
  { value: "5,0", label: "рейтинг" },
  { value: "427", label: "оценок" },
  { value: "267", label: "отзывов" },
  { value: "10-21", label: "ежедневно" }
];

const benefits = [
  ["Хорошее место 2026", "Высокая оценка клиентов и понятный сервис без лишнего давления."],
  ["Сильная ремонтная зона", "Подъемники, 3D сход-развал, диагностика и рабочие посты в одном месте."],
  ["Цена до начала работ", "Сначала диагностика и согласование, потом ремонт и контроль результата."],
  ["Работа с разными задачами", "От ТО и шиномонтажа до двигателя, ходовой, выхлопа и автоподбора."],
  ["Фото реального сервиса", "На сайте использованы реальные кадры СТО Stinger, без стокового вида."],
  ["Удобно в Кудрово", "Пражская улица, ежедневный график до 21:00 и быстрый маршрут через Яндекс."]
];

const services = [
  { title: "Ремонт двигателя", text: "Диагностика, ремонт узлов, устранение причин шума, троения и потери тяги.", icon: Engine },
  { title: "Ремонт ходовой", text: "Подвеска, рулевое, тормоза, стойки, рычаги и контроль после сборки.", icon: SteeringWheel },
  { title: "Сход-развал 3D", text: "Точная настройка геометрии колес на современном стенде.", price: "от 2 000 ₽", icon: Gauge },
  { title: "Шиномонтаж", text: "Сезонная переобувка, балансировка и проверка состояния колес.", icon: Tire },
  { title: "ТО автомобиля", text: "Масло, фильтры, жидкости, регламентное обслуживание и осмотр.", icon: Wrench },
  { title: "Компьютерная диагностика", text: "Поиск ошибок, проверка систем и понятное объяснение результата.", icon: GearSix },
  { title: "Ремонт выхлопной системы", text: "Выхлоп, катализатор, шум, герметичность и восстановление узлов.", icon: ShieldCheck },
  { title: "Автоподбор", text: "Проверка автомобиля перед покупкой и оценка рисков.", price: "от 2 500 ₽", icon: CarProfile },
  { title: "Полировка, химчистка, керамика", text: "Внешний вид, защита кузова и аккуратная подготовка автомобиля.", icon: Sparkle }
];

const process = ["Заявка", "Диагностика", "Смета", "Ремонт", "Контроль", "Выдача"];

const works = [
  { name: "Сход-развал 3D", price: "от 2 000 ₽" },
  { name: "Автоподбор", price: "от 2 500 ₽" },
  { name: "Шиномонтаж", price: "по размеру колес" },
  { name: "Компьютерная диагностика", price: "после согласования" },
  { name: "Ремонт ходовой", price: "по дефектовке" },
  { name: "ТО автомобиля", price: "по регламенту" }
];

const gallery = [
  { src: "/images/stinger-facade-wide.png", alt: "Фасад СТО Stinger в Кудрово" },
  { src: "/images/stinger-sign-sky.png", alt: "Вывеска СТО Stinger" },
  { src: "/images/stinger-lifts.png", alt: "Ремонтная зона СТО Stinger с подъемниками" },
  { src: "/images/stinger-alignment.png", alt: "Стенд 3D сход-развала в СТО Stinger" },
  { src: "/images/stinger-engine-wash.png", alt: "Мойка и обслуживание моторного отсека" }
];

type MotionExtra = { transition?: { delay?: number } };

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -90px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function revealStyle(style: CSSProperties | undefined, transition: MotionExtra["transition"]) {
  return transition?.delay ? { ...style, transitionDelay: `${transition.delay}s` } : style;
}

function MotionDiv({ transition, className = "", style, ...props }: HTMLAttributes<HTMLDivElement> & MotionExtra) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`reveal ${className}`} style={revealStyle(style, transition)} {...props} />;
}

function MotionA({ transition, className = "", style, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & MotionExtra) {
  const ref = useReveal<HTMLAnchorElement>();
  return <a ref={ref} className={`reveal ${className}`} style={revealStyle(style, transition)} {...props} />;
}

function MotionForm({ transition, className = "", style, ...props }: FormHTMLAttributes<HTMLFormElement> & MotionExtra) {
  const ref = useReveal<HTMLFormElement>();
  return <form ref={ref} className={`reveal ${className}`} style={revealStyle(style, transition)} {...props} />;
}

const motion = { div: MotionDiv, a: MotionA, form: MotionForm };

function SectionTitle({ kicker, title, text }: { kicker?: string; title: string; text?: string }) {
  return (
    <motion.div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      {kicker ? <p className="mb-4 text-sm font-semibold text-[var(--blue)]">{kicker}</p> : null}
      <h2 className="text-3xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">{title}</h2>
      {text ? <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">{text}</p> : null}
    </motion.div>
  );
}

function PrimaryButton({ children, href = "#booking" }: { children: ReactNode; href?: string }) {
  return (
    <a href={href} className="primary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white active:translate-y-px sm:px-6">
      {children}
    </a>
  );
}

function SecondaryButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a href={href} className="secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold active:translate-y-px sm:px-6">
      {children}
    </a>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className={`burger-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [navPill, setNavPill] = useState({ left: 0, width: 0, opacity: 0 });

  function moveNavPill(node: HTMLAnchorElement) {
    const parent = navRef.current;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    setNavPill({ left: nodeRect.left - parentRect.left, width: nodeRect.width, opacity: 1 });
  }

  return (
    <main className="page-shell min-h-[100dvh] overflow-hidden pb-20 text-[var(--ink)] lg:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/76 shadow-[0_1px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="group flex items-center gap-3">
            <span className="brand-mark grid size-11 place-items-center rounded-2xl text-lg font-black text-white">S</span>
            <span>
              <span className="block text-base font-bold leading-none">СТО Stinger</span>
              <span className="mt-1 block text-xs text-[var(--muted)]">автосервис в Кудрово</span>
            </span>
          </a>

          <nav ref={navRef} className="liquid-nav relative hidden items-center gap-2 rounded-full p-1 text-sm text-[var(--muted)] lg:flex" onMouseLeave={() => setNavPill((value) => ({ ...value, opacity: 0 }))}>
            <span className="liquid-nav-pill" style={{ opacity: navPill.opacity, transform: `translateX(${navPill.left}px)`, width: navPill.width }} />
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={(event) => moveNavPill(event.currentTarget)} onFocus={(event) => moveNavPill(event.currentTarget)} className="relative z-10 rounded-full px-4 py-2 transition hover:text-[var(--ink)] focus-visible:text-[var(--ink)] focus-visible:outline-none">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="text-right text-xs leading-5 text-[var(--muted)]">
              <span className="mb-1 block font-medium text-[var(--ink)]">10:00-21:00 ежедневно</span>
              <a href={phone.href} className="transition hover:text-[var(--blue)]">{phone.value}</a>
            </div>
            <PrimaryButton href={phone.href}><Phone size={17} weight="bold" />Позвонить</PrimaryButton>
          </div>

          <div className="ml-auto mr-2 flex items-center gap-2 lg:hidden">
            <a href={phone.href} className="primary-button grid size-11 place-items-center rounded-2xl" aria-label="Позвонить">
              <Phone size={18} weight="bold" />
            </a>
          </div>
          <button className="burger-button grid size-11 place-items-center rounded-2xl lg:hidden" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen((value) => !value)}>
            <BurgerIcon open={open} />
          </button>
        </div>

        {open ? (
          <div className="mobile-menu border-t border-black/5 bg-white/96 px-4 py-5 shadow-2xl lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-3">
              <div className="rounded-2xl border border-black/8 bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]">10:00-21:00 ежедневно</div>
              {nav.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-2xl border border-black/8 px-4 py-3 text-sm text-[var(--ink)]">
                  {item}
                </a>
              ))}
              <PrimaryButton href={phone.href}><Phone size={17} weight="bold" />Позвонить</PrimaryButton>
            </div>
          </div>
        ) : null}
      </header>

      <section className="hero-section relative pt-28">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 md:pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <motion.div className="hero-copy">
            <div className="premium-pill mb-6 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-[var(--blue)]">
              <SealCheck size={17} weight="fill" />Хорошее место 2026
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] text-[var(--ink)] md:text-6xl">СТО Stinger. Точный сервис для автомобилей в Кудрово</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">Ремонт двигателя и ходовой, 3D сход-развал, шиномонтаж, диагностика, ТО и подготовка автомобиля без хаоса и лишних обещаний.</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton><CalendarCheck size={18} weight="bold" />Записаться</PrimaryButton>
              <SecondaryButton href={phone.href}><Phone size={18} weight="bold" />Позвонить</SecondaryButton>
              <SecondaryButton href={mapHref}><MapPin size={18} weight="bold" />Маршрут</SecondaryButton>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="metric-card rounded-3xl p-4">
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
              <div className="flex items-center gap-2"><MapPin size={18} className="text-[var(--red)]" />{address}</div>
              <div className="flex items-center gap-2"><Clock size={18} className="text-[var(--blue)]" />Открыто до 21:00</div>
            </div>
          </motion.div>

          <motion.div className="hero-visual relative">
            <div className="chrome-frame hero-card overflow-hidden rounded-[32px]">
              <div className="relative aspect-[1.16] min-h-[420px]">
                <Image src="/images/stinger-facade-wide.png" alt="Фасад СТО Stinger" fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[24px] border border-white/70 bg-white/78 p-4 shadow-xl backdrop-blur-xl sm:grid-cols-3">
                <div><p className="text-xs text-[var(--muted)]">Рейтинг</p><p className="mt-1 font-semibold">5,0 из 5</p></div>
                <div><p className="text-xs text-[var(--muted)]">Оценки</p><p className="mt-1 font-semibold">427 клиентов</p></div>
                <div><p className="text-xs text-[var(--muted)]">Категория</p><p className="mt-1 font-semibold">Автосервис СТО</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="преимущества" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Дорогой сервис начинается с порядка" text="Stinger показывает реальную ремонтную зону, прозрачный процесс и понятные услуги для владельца автомобиля." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([title, text], index) => (
              <motion.div key={title} transition={{ delay: index * 0.035 }} className="premium-card card-hover rounded-[24px] p-6">
                <CheckCircle size={28} weight="fill" className="text-[var(--blue)]" />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="услуги" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Услуги" title="Все ключевые работы в одном месте" text="Карточки собраны как быстрый каталог: владелец сразу видит нужное направление ремонта." />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.a key={service.title} href="#booking" transition={{ delay: index * 0.025 }} className="premium-card card-hover group min-h-48 rounded-[24px] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <Icon size={28} className={index % 2 ? "text-[var(--red)]" : "text-[var(--blue)]"} />
                    <ArrowRight size={18} className="text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--red)]" />
                  </div>
                  <h3 className="mt-7 text-xl font-semibold leading-snug">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{service.text}</p>
                  {service.price ? <p className="mt-5 text-lg font-semibold text-[var(--red)]">{service.price}</p> : null}
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="процесс" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Понятный процесс без лишнего шума" text="От первого звонка до выдачи автомобиля после контрольной проверки." />
          <div className="relative grid gap-4 lg:grid-cols-6">
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent lg:block" />
            {process.map((step, index) => (
              <motion.div key={step} transition={{ delay: index * 0.05 }} className="relative">
                <div className="premium-card rounded-[24px] p-5">
                  <div className="premium-step grid size-14 place-items-center rounded-2xl font-mono text-sm font-semibold text-white">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="mt-8 text-lg font-semibold">{step}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="promo-panel mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[28px] p-6 md:grid-cols-[1fr_0.7fr] md:p-10">
          <motion.div>
            <p className="text-sm font-semibold text-[var(--red)]">По старым ценам</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">Шиномонтаж и сервисные работы без скачка ожиданий</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">Уточните актуальные предложения и ближайшее окно записи у администратора СТО Stinger.</p>
          </motion.div>
          <div className="flex items-end md:justify-end">
            <PrimaryButton href="#booking">Узнать подробнее<ArrowRight size={18} weight="bold" /></PrimaryButton>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Популярные работы" text="Финальная стоимость зависит от модели автомобиля, состояния узлов и объема работ." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <motion.div key={work.name} className="premium-card rounded-[24px] p-6">
                <p className="text-lg font-semibold">{work.name}</p>
                <p className="mt-5 text-2xl font-semibold text-[var(--blue)]">{work.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Реальная зона Stinger" text="Фасад, вывеска, подъемники, оборудование и рабочие процессы из приложенных материалов." />
          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
            {gallery.map((image, index) => (
              <motion.div key={image.src} className={`gallery-tile relative overflow-hidden rounded-[24px] ${index === 0 || index === 2 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="отзывы" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Рейтинг 5,0 и 427 оценок" text="Социальное доказательство вынесено на страницу без выдуманных отзывов и фальшивых цитат." />
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1fr]">
            <motion.div className="premium-panel rounded-[28px] p-8">
              <div className="flex items-center gap-3 text-[var(--red)]">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={22} weight="fill" />)}
              </div>
              <div className="mt-8 text-6xl font-semibold">5,0</div>
              <p className="mt-3 text-[var(--muted)]">427 оценок, 267 отзывов, Хорошее место 2026</p>
              <div className="mt-8"><SecondaryButton href={mapHref}>Открыть на карте</SecondaryButton></div>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-2">
              {["Аккуратная диагностика", "Понятное согласование", "Удобный график", "Реальная ремонтная зона"].map((item) => (
                <motion.div key={item} className="premium-card rounded-[24px] p-6">
                  <p className="font-semibold">{item}</p>
                  <div className="mt-6 h-3 w-full rounded-full bg-slate-200" />
                  <div className="mt-3 h-3 w-5/6 rounded-full bg-slate-200" />
                  <div className="mt-3 h-3 w-2/3 rounded-full bg-slate-200" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr]">
          <motion.div>
            <p className="text-sm font-semibold text-[var(--blue)]">Запись</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Оставьте заявку на обслуживание</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">Оставьте контакты, марку автомобиля и задачу. Администратор свяжется с вами для уточнения времени визита.</p>
            <div className="mt-8 space-y-4 text-[var(--muted)]">
              <a href={phone.href} className="flex items-center gap-3 transition hover:text-[var(--blue)]"><Phone size={20} className="text-[var(--blue)]" />{phone.value}</a>
              <a href={mapHref} className="flex items-center gap-3 transition hover:text-[var(--red)]"><MapPin size={20} className="text-[var(--red)]" />{address}</a>
            </div>
          </motion.div>

          <MotionForm onSubmit={(event) => event.preventDefault()} className="premium-panel rounded-[28px] p-5 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {["Имя", "Телефон", "Марка автомобиля"].map((label) => (
                <label key={label} className="grid gap-2 text-sm font-medium text-[var(--muted)]">
                  {label}
                  <input className="premium-input min-h-13 rounded-2xl px-4 text-[var(--ink)] outline-none transition placeholder:text-slate-400" placeholder={label} type={label === "Телефон" ? "tel" : "text"} />
                </label>
              ))}
              <label className="grid gap-2 text-sm font-medium text-[var(--muted)] md:col-span-2">
                Что требуется сделать
                <textarea className="premium-input min-h-32 resize-none rounded-2xl px-4 py-4 text-[var(--ink)] outline-none transition placeholder:text-slate-400" placeholder="Кратко опишите задачу" />
              </label>
            </div>
            <button className="primary-button mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold text-white active:translate-y-px">
              <CalendarCheck size={18} weight="bold" />Записаться в сервис
            </button>
          </MotionForm>
        </div>
      </section>

      <section id="контакты" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1fr]">
          <motion.div className="premium-panel rounded-[28px] p-6 md:p-8">
            <h2 className="text-3xl font-semibold md:text-5xl">Контакты</h2>
            <div className="mt-8 space-y-5 text-[var(--muted)]">
              <p className="flex gap-3"><MapPin size={22} className="mt-1 shrink-0 text-[var(--red)]" />{address}</p>
              <p className="flex gap-3"><Clock size={22} className="mt-1 shrink-0 text-[var(--blue)]" />10:00-21:00 ежедневно</p>
              <a href={phone.href} className="flex gap-3 transition hover:text-[var(--blue)]"><Phone size={22} className="shrink-0 text-[var(--blue)]" />{phone.value}</a>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href={phone.href}><Phone size={18} weight="bold" />Позвонить</PrimaryButton>
              <SecondaryButton href={mapHref}><MapPin size={18} weight="bold" />Построить маршрут</SecondaryButton>
            </div>
          </motion.div>

          <motion.div className="map-grid relative min-h-[420px] overflow-hidden rounded-[28px] border border-black/8">
            <div className="premium-pin absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white">
              <MapPin size={30} weight="fill" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/80 bg-white/86 p-5 shadow-xl backdrop-blur-xl">
              <p className="text-sm text-[var(--muted)]">СТО Stinger на карте</p>
              <p className="mt-1 text-lg font-semibold">{address}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-black/8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="brand-mark grid size-11 place-items-center rounded-2xl text-lg font-black text-white">S</span>
              <div>
                <p className="font-semibold">СТО Stinger</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Ремонт и обслуживание автомобилей</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-[var(--muted)]">Сведения на сайте носят справочный характер. Актуальные цены, сроки и условия обслуживания уточняйте у администратора.</p>
          </div>
          <div className="text-sm text-[var(--muted)]">
            <p className="mb-3 font-semibold text-[var(--ink)]">Навигация</p>
            <div className="grid gap-2">
              {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[var(--blue)]">{item}</a>)}
            </div>
          </div>
          <div className="text-sm text-[var(--muted)]">
            <p className="mb-3 font-semibold text-[var(--ink)]">Контакты</p>
            <p>{address}</p>
            <p className="mt-2">10:00-21:00</p>
            <p className="mt-2">{phone.value}</p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl text-sm text-slate-400">© 2026 СТО Stinger</div>
      </footer>

      <a href={phone.href} className="primary-button fixed bottom-4 left-4 right-4 z-50 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white lg:hidden">
        <Phone size={19} weight="bold" />Позвонить в сервис
      </a>
    </main>
  );
}
