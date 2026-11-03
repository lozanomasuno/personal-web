"use client";

import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { useEffect, useId, useState, type FormEvent } from "react";

import { cn } from "@/lib/cn";

/**
 * Formulario de contacto sin backend (cliente).
 *
 * Valida en el navegador y, si los datos son correctos, abre la aplicación de correo
 * del visitante con un `mailto:` que incluye asunto y cuerpo prellenados. No envía
 * datos a ningún servidor. Si `email` está vacío (dato pendiente en `data/site.ts`),
 * no abre nada y muestra un aviso: así no se pierde el mensaje de forma silenciosa.
 *
 * Preselección del tipo de proyecto: cualquier enlace de la página con el atributo
 * `data-contact-topic="<id>"` (p. ej. los CTA de Pricing y Servicios) selecciona esa
 * opción al pulsarlo. Sin JavaScript el enlace sigue llevando a `#contact`.
 *
 * Límites: nombre ≤ 100, correo ≤ 254 (RFC 5321) y mensaje entre 20 y 1500 caracteres
 * (los `mailto:` largos pueden truncarse en algunos clientes de correo).
 */
const LIMITS = { name: 100, email: 254, messageMin: 20, messageMax: 1500 } as const;

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = { kind: "success" | "error"; text: string } | null;

type ContactFormProps = {
  email: string;
  topics: Array<{ id: string; label: string }>;
  labels: {
    title: string;
    name: string;
    email: string;
    topic: string;
    topicPlaceholder: string;
    topicOther: string;
    message: string;
    messagePlaceholder: string;
    characters: string;
    submit: string;
    note: string;
    errors: Record<
      | "nameRequired"
      | "nameTooLong"
      | "emailRequired"
      | "emailInvalid"
      | "emailTooLong"
      | "messageRequired"
      | "messageTooShort"
      | "messageTooLong"
      | "summary",
      string
    >;
    success: string;
    unavailable: string;
    subjectPrefix: string;
  };
};

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

// Validación pragmática: texto@texto.dominio, sin espacios.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ email, topics, labels }: ContactFormProps) {
  const id = useId();
  const [topic, setTopic] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);

  // Preselección desde los CTA marcados con `data-contact-topic`.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLElement>("[data-contact-topic]");
      const value = link?.dataset.contactTopic;
      if (value && topics.some((item) => item.id === value)) setTopic(value);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [topics]);

  const validate = (data: FormData): Errors => {
    const name = String(data.get("name") ?? "").trim();
    const mail = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};
    const e = labels.errors;

    if (!name) next.name = e.nameRequired;
    else if (name.length > LIMITS.name) next.name = fill(e.nameTooLong, { max: LIMITS.name });

    if (!mail) next.email = e.emailRequired;
    else if (mail.length > LIMITS.email) next.email = fill(e.emailTooLong, { max: LIMITS.email });
    else if (!EMAIL_PATTERN.test(mail)) next.email = e.emailInvalid;

    if (!message) next.message = e.messageRequired;
    else if (message.length < LIMITS.messageMin) next.message = fill(e.messageTooShort, { min: LIMITS.messageMin });
    else if (message.length > LIMITS.messageMax) next.message = fill(e.messageTooLong, { max: LIMITS.messageMax });

    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = (["name", "email", "message"] as Field[]).find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus({ kind: "error", text: labels.errors.summary });
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!email) {
      // Se conservan los datos escritos para que el visitante no los pierda.
      setStatus({ kind: "error", text: labels.unavailable });
      return;
    }

    const name = String(data.get("name")).trim();
    const topicLabel = topics.find((item) => item.id === data.get("topic"))?.label ?? labels.topicOther;
    const subject = `[${labels.subjectPrefix}] ${topicLabel} — ${name}`;
    const body = [
      `${labels.name}: ${name}`,
      `${labels.email}: ${String(data.get("email")).trim()}`,
      `${labels.topic}: ${topicLabel}`,
      "",
      String(data.get("message")).trim(),
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "success", text: fill(labels.success, { email }) });
  };

  const fieldClass = (invalid: boolean) =>
    cn(
      "w-full rounded-2xl bg-white px-4 py-3 text-[0.9375rem] text-ink ring-1 transition-shadow duration-200",
      "placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong",
      invalid ? "ring-[#d03b3b]" : "ring-line hover:ring-brand/40",
    );

  const errorId = (field: Field) => `${id}-${field}-error`;

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={`${id}-title`} className="flex flex-col gap-5">
      <h3 id={`${id}-title`} className="text-xl font-semibold tracking-[-0.02em] text-ink">
        {labels.title}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-ink">
            {labels.name}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={fieldClass(Boolean(errors.name))}
          />
          <FieldError id={errorId("name")} message={errors.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink">
            {labels.email}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={fieldClass(Boolean(errors.email))}
          />
          <FieldError id={errorId("email")} message={errors.email} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-topic`} className="text-sm font-medium text-ink">
          {labels.topic}
        </label>
        <select
          id={`${id}-topic`}
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className={cn(fieldClass(false), "select-chevron pr-10")}
        >
          <option value="">{labels.topicPlaceholder}</option>
          {topics.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
          <option value="other">{labels.topicOther}</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={`${id}-message`} className="text-sm font-medium text-ink">
            {labels.message}
          </label>
          <span id={`${id}-counter`} className="text-xs text-muted tabular-nums">
            {messageLength} / {LIMITS.messageMax} {labels.characters}
          </span>
        </div>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          maxLength={LIMITS.messageMax}
          required
          placeholder={labels.messagePlaceholder}
          onChange={(event) => setMessageLength(event.target.value.length)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={cn(`${id}-counter`, errors.message && errorId("message"))}
          className={cn(fieldClass(Boolean(errors.message)), "min-h-36 resize-y")}
        />
        <FieldError id={errorId("message")} message={errors.message} />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-body sm:max-w-xs">{labels.note}</p>
        <button
          type="submit"
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-strong px-6 text-[0.9375rem] font-medium text-white shadow-glow transition-[background-color,transform] duration-300 ease-apple hover:bg-brand-deep active:scale-[0.98]"
        >
          {labels.submit}
          <Send
            className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      <div aria-live="polite" role="status">
        {status ? (
          <p
            className={cn(
              "flex items-start gap-2.5 rounded-2xl px-4 py-3 text-sm leading-relaxed",
              status.kind === "success" ? "bg-[#ecfdf5] text-up" : "bg-[#fef3f2] text-down",
            )}
          >
            {status.kind === "success" ? (
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            {status.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-down">
      <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}
