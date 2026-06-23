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

const nav = ["Уровень", "Услуги", "Процесс", "Фото", "Контакты"];
const phone = { value: "+7 (981) 790-00-09", href: "tel:+79817900009" };
const address = "Пражская ул., 17Е, Кудрово";
const mapHref = "https://yandex.ru/maps/?text=%D0%9F%D1%80%D0%B0%D0%B6%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB.%2C%2017%D0%95%2C%20%D0%9A%D1%83%D0%B4%D1%80%D0%BE%D0%B2%D0%BE";

const stats = [
  ["5.0", "рейтинг"],
  ["427", "оценок"],
  ["Хорошее место", "2026"],
  ["Ежедневно", "10:00-21:00"],
  ["Гарантия", "на работы"]
];

const benefits = [
  ["Дилерская дисциплина", "Диагностика, согласование, ремонт и выдача без хаоса."],
  ["Оборудование в кадре", "Подъёмники, 3D сход-развал и рабочая зона видны сразу."],
  ["Сильная репутация", "5.0 рейтинг, 427 оценок и статус Хорошее место 2026."],
  ["Автомобили высокого класса", "Спокойный сервис для машин, где цена ошибки слишком высока."]
];

const services = [
  { title: "Ремонт двигателя", text: "Точная диагностика причин, ремонт узлов, контроль после сборки.", price: "", image: "/images/stinger-engine-wash.png", icon: Engine },
  { title: "Ходовая часть", text: "Подвеска, рулевое, тормоза, стойки, рычаги и проверка геометрии.", price: "", image: "/images/stinger-lifts.png", icon: SteeringWheel },
  { title: "Сход-развал 3D", text: "Настройка геометрии колес на современном стенде.", price: "от 2 000 ₽", image: "/images/stinger-alignment.png", icon: Gauge },
  { title: "Шиномонтаж", text: "Сезонная переобувка, балансировка, осмотр колес и дисков.", price: "", image: "/images/stinger-lifts.png", icon: Tire },
  { title: "ТО автомобиля", text: "Масло, фильтры, жидкости, регламент и профилактический осмотр.", price: "", image: "/images/stinger-lifts.png", icon: Wrench },
  { title: "Компьютерная диагностика", text: "Ошибки, датчики, электронные системы и понятный отчёт.", price: "", image: "/images/stinger-alignment.png", icon: GearSix },
  { title: "Выхлоп и катализатор", text: "Герметичность, шум, катализатор и восстановление системы.", price: "", image: "/images/stinger-engine-wash.png", icon: ShieldCheck },
  { title: "Автоподбор", text: "Проверка автомобиля перед покупкой и оценка скрытых рисков.", price: "от 2 500 ₽", image: "/images/stinger-facade-wide.png", icon: CarProfile },
  { title: "Детейлинг", text: "Полировка, химчистка, керамика и подготовка внешнего вида.", price: "", image: "/images/stinger-sign-sky.png", icon: Sparkle }
];

const process = ["Приём", "Диагностика", "Смета", "Ремонт", "Контроль", "Выдача"];

const gallery = [
  { src: "/images/stinger-lifts.png", alt: "Ремонтная зона Stinger с подъёмником" },
  { src: "/images/stinger-alignment.png", alt: "3D сход-развал Stinger" },
  { src: "/images/stinger-engine-wash.png", alt: "Работа с моторным отсеком" },
  { src: "/images/stinger-sign-sky.png", alt: "Вывеска Stinger" },
  { src: "/images/stinger-facade-wide.png", alt: "Фасад СТО Stinger" }
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
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
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

function PrimaryButton({ children, href = "#booking" }: { children: ReactNode; href?: string }) {
  return <a href={href} className="primary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white">{children}</a>;
}

function SecondaryButton({ children, href }: { children: ReactNode; href: string }) {
  return <a href={href} className="secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white">{children}</a>;
}

function SectionTitle({ kicker, title, text }: { kicker?: string; title: string; text?: string }) {
  return (
    <motion.div className="mb-10 max-w-3xl md:mb-14">
      {kicker ? <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">{kicker}</p> : null}
      <h2 className="text-4xl font-black leading-[0.98] tracking-tight text-white md:text-6xl">{title}</h2>
      {text ? <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">{text}</p> : null}
    </motion.div>
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
    <main className="page-shell min-h-[100dvh] overflow-hidden pb-20 text-white lg:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08090c]/84 shadow-[0_18px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="group flex items-center gap-3">
            <span className="brand-mark grid size-10 place-items-center rounded-xl text-lg font-black text-white">S</span>
            <span>
              <span className="block text-base font-black leading-none text-white">СТО Stinger</span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">service center</span>
            </span>
          </a>

          <nav ref={navRef} className="liquid-nav relative hidden items-center gap-1 rounded-full p-1 text-sm text-[var(--muted)] lg:flex" onMouseLeave={() => setNavPill((value) => ({ ...value, opacity: 0 }))}>
            <span className="liquid-nav-pill" style={{ opacity: navPill.opacity, transform: `translateX(${navPill.left}px)`, width: navPill.width }} />
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={(event) => moveNavPill(event.currentTarget)} onFocus={(event) => moveNavPill(event.currentTarget)} className="relative z-10 rounded-full px-4 py-2 transition hover:text-white focus-visible:text-white focus-visible:outline-none">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="text-right text-xs leading-5 text-[var(--muted)]">
              <span className="mb-1 block font-semibold text-white">10:00-21:00 ежедневно</span>
              <a href={phone.href} className="transition hover:text-white">{phone.value}</a>
            </div>
            <PrimaryButton href={phone.href}><Phone size={17} weight="bold" />Позвонить</PrimaryButton>
          </div>

          <div className="ml-auto mr-2 flex items-center gap-2 lg:hidden">
            <a href={phone.href} className="primary-button grid size-11 place-items-center rounded-xl" aria-label="Позвонить"><Phone size={18} weight="bold" /></a>
          </div>
          <button className="burger-button grid size-11 place-items-center rounded-xl lg:hidden" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen((value) => !value)}>
            <BurgerIcon open={open} />
          </button>
        </div>

        {open ? (
          <div className="mobile-menu border-t border-white/10 bg-[#08090c]/96 px-4 py-5 shadow-2xl lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-3">
              {nav.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white">{item}</a>
              ))}
              <PrimaryButton href={phone.href}><Phone size={17} weight="bold" />Позвонить</PrimaryButton>
            </div>
          </div>
        ) : null}
      </header>

      <section className="hero-section relative min-h-[100dvh] overflow-hidden">
        <Image src="/images/stinger-lifts.png" alt="Премиальная ремонтная зона Stinger" fill priority sizes="100vw" className="hero-bg object-cover" />
        <div className="hero-shade" />
        <div className="hero-red-glow" />
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-4 pb-8 pt-28 sm:px-6 lg:px-8">
          <motion.div className="max-w-5xl pb-8">
            <div className="premium-pill mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
              <SealCheck size={16} weight="fill" /> Хорошее место 2026
            </div>
            <h1 className="hero-title max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              Сервисный центр для дорогих автомобилей
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-7 text-white/78 md:text-xl">
              Ремонт, диагностика, 3D сход-развал и обслуживание в Кудрово. Без гаражного хаоса. С гарантией на работы.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton><CalendarCheck size={18} weight="bold" />Записаться</PrimaryButton>
              <SecondaryButton href={phone.href}><Phone size={18} weight="bold" />Позвонить</SecondaryButton>
            </div>
          </motion.div>

          <motion.div className="hero-stat-panel grid gap-0 overflow-hidden rounded-2xl lg:grid-cols-5">
            {stats.map(([value, label]) => (
              <div key={`${value}-${label}`} className="stat-cell px-5 py-5">
                <div className="text-xl font-black text-white">{value}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/46">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="уровень" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Уровень" title="Не обычное СТО. Специализированный сервисный центр." text="Stinger должен ощущаться как место, куда спокойно отдают автомобиль стоимостью несколько миллионов рублей." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([title, text], index) => (
              <motion.div key={title} transition={{ delay: index * 0.04 }} className="premium-card card-hover rounded-2xl p-6">
                <CheckCircle size={28} weight="fill" className="text-[var(--red)]" />
                <h3 className="mt-6 text-xl font-black text-white">{title}</h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="услуги" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Услуги" title="Работы, которые требуют точности" text="Каждая карточка выглядит как продукт высокого класса: фото, короткая суть, цена там, где она известна." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.a key={service.title} href="#booking" transition={{ delay: index * 0.025 }} className="service-card group overflow-hidden rounded-2xl">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="service-image object-cover transition duration-700 group-hover:scale-110" />
                    <div className="service-image-shade" />
                    <div className="absolute left-5 top-5 grid size-12 place-items-center rounded-xl border border-white/10 bg-black/45 text-[var(--red)] backdrop-blur-md">
                      <Icon size={25} weight="bold" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-black leading-tight text-white">{service.title}</h3>
                      <ArrowRight size={20} className="mt-1 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-[var(--red)]" />
                    </div>
                    <p className="mt-4 min-h-12 text-sm leading-6 text-[var(--muted)]">{service.text}</p>
                    {service.price ? <p className="mt-5 text-xl font-black text-[var(--red)]">{service.price}</p> : null}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="процесс" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Процесс" title="Контроль на каждом этапе" text="Короткая цепочка без лишних разговоров: принять, проверить, согласовать, сделать, выдать." />
          <div className="process-grid grid gap-3 lg:grid-cols-6">
            {process.map((step, index) => (
              <motion.div key={step} transition={{ delay: index * 0.05 }} className="process-card rounded-2xl p-5">
                <div className="text-sm font-black text-[var(--red)]">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="mt-10 text-xl font-black text-white">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="фото" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Фото" title="Единая тёмная обработка реальных кадров" text="Высокий контраст, глубокие тени и красный акцент превращают реальные фото в фирменную визуальную систему." />
          <div className="grid auto-rows-[230px] gap-4 md:grid-cols-4">
            {gallery.map((image, index) => (
              <motion.div key={image.src} className={`gallery-tile relative overflow-hidden rounded-2xl ${index === 0 || index === 4 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 hover:scale-105" />
                <div className="gallery-shade" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="отзывы" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1fr]">
          <motion.div className="rating-panel rounded-2xl p-8">
            <div className="flex items-center gap-3 text-[var(--red)]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={24} weight="fill" />)}</div>
            <div className="mt-8 text-7xl font-black text-white">5.0</div>
            <p className="mt-4 max-w-md text-lg leading-7 text-[var(--muted)]">427 оценок, 267 отзывов, Хорошее место 2026. Репутация, которую видно до первого звонка.</p>
          </motion.div>
          <motion.div className="promo-panel rounded-2xl p-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--red)]">По старым ценам</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">Шиномонтаж и сервисные работы без лишнего ожидания</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">Уточните актуальные предложения и ближайшее окно записи у администратора СТО Stinger.</p>
            <div className="mt-8"><PrimaryButton href="#booking">Записаться<ArrowRight size={18} weight="bold" /></PrimaryButton></div>
          </motion.div>
        </div>
      </section>

      <section id="booking" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr]">
          <motion.div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--red)]">Запись</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">Оставьте заявку на обслуживание</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">Опишите автомобиль и задачу. Администратор свяжется с вами для уточнения времени визита.</p>
            <div className="mt-8 space-y-4 text-white/72">
              <a href={phone.href} className="flex items-center gap-3 transition hover:text-white"><Phone size={20} className="text-[var(--red)]" />{phone.value}</a>
              <a href={mapHref} className="flex items-center gap-3 transition hover:text-white"><MapPin size={20} className="text-[var(--red)]" />{address}</a>
            </div>
          </motion.div>

          <MotionForm onSubmit={(event) => event.preventDefault()} className="form-panel rounded-2xl p-5 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {["Имя", "Телефон", "Марка автомобиля"].map((label) => (
                <label key={label} className="grid gap-2 text-sm font-bold text-white/72">
                  {label}
                  <input className="premium-input min-h-13 rounded-xl px-4 text-white outline-none transition placeholder:text-white/28" placeholder={label} type={label === "Телефон" ? "tel" : "text"} />
                </label>
              ))}
              <label className="grid gap-2 text-sm font-bold text-white/72 md:col-span-2">
                Что требуется сделать
                <textarea className="premium-input min-h-32 resize-none rounded-xl px-4 py-4 text-white outline-none transition placeholder:text-white/28" placeholder="Кратко опишите задачу" />
              </label>
            </div>
            <button className="primary-button mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white">
              <CalendarCheck size={18} weight="bold" />Записаться в сервис
            </button>
          </MotionForm>
        </div>
      </section>

      <section id="контакты" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1fr]">
          <motion.div className="premium-card rounded-2xl p-6 md:p-8">
            <h2 className="text-4xl font-black text-white md:text-6xl">Контакты</h2>
            <div className="mt-8 space-y-5 text-white/70">
              <p className="flex gap-3"><MapPin size={22} className="mt-1 shrink-0 text-[var(--red)]" />{address}</p>
              <p className="flex gap-3"><Clock size={22} className="mt-1 shrink-0 text-[var(--red)]" />10:00-21:00 ежедневно</p>
              <a href={phone.href} className="flex gap-3 transition hover:text-white"><Phone size={22} className="shrink-0 text-[var(--red)]" />{phone.value}</a>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href={phone.href}><Phone size={18} weight="bold" />Позвонить</PrimaryButton>
              <SecondaryButton href={mapHref}><MapPin size={18} weight="bold" />Маршрут</SecondaryButton>
            </div>
          </motion.div>

          <motion.div className="map-grid relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10">
            <div className="premium-pin absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white">
              <MapPin size={30} weight="fill" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/72 p-5 shadow-xl backdrop-blur-xl">
              <p className="text-sm text-white/46">СТО Stinger на карте</p>
              <p className="mt-1 text-lg font-black text-white">{address}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-white/46 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="brand-mark grid size-10 place-items-center rounded-xl text-lg font-black text-white">S</span>
            <div>
              <p className="font-black text-white">СТО Stinger</p>
              <p className="mt-1">Ремонт и обслуживание автомобилей</p>
            </div>
          </div>
          <p>© 2026 СТО Stinger</p>
        </div>
      </footer>

      <a href={phone.href} className="primary-button fixed bottom-4 left-4 right-4 z-50 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl text-sm font-bold text-white lg:hidden">
        <Phone size={19} weight="bold" />Позвонить в сервис
      </a>
    </main>
  );
}
