"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./ContactForm.module.css";

const countryCodes = ["EG", "SD", "SA", "AE", "KW", "QA", "JO", "IQ", "LY", "OTHER"] as const;

type FormValues = {
  name: string;
  company: string;
  country: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
};

export function ContactForm() {
  const t = useTranslations("contact");
  const tc = useTranslations("countries");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, { message: t("validation.name") }),
        company: z.string(),
        country: z.string().min(1, { message: t("validation.country") }),
        phone: z.string().min(6, { message: t("validation.phone") }),
        email: z.string().email({ message: t("validation.email") }),
        interest: z.string(),
        message: z.string().min(20, { message: t("validation.message") }),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      country: "",
      phone: "",
      email: "",
      interest: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      reset();
    } catch {
      setStatus("err");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.row}>
        <label className={styles.label}>
          {t("name")}
          <input className={styles.input} {...register("name")} autoComplete="name" />
          {errors.name ? (
            <span className={styles.error} role="alert">
              {errors.name.message}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          {t("company")}
          <input className={styles.input} {...register("company")} autoComplete="organization" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>
          {t("country")}
          <select className={styles.select} {...register("country")}>
            <option value="" disabled>
              —
            </option>
            {countryCodes.map((code) => (
              <option key={code} value={code}>
                {tc(code)}
              </option>
            ))}
          </select>
          {errors.country ? (
            <span className={styles.error} role="alert">
              {errors.country.message}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          {t("phone")}
          <input className={styles.input} type="tel" {...register("phone")} autoComplete="tel" />
          {errors.phone ? (
            <span className={styles.error} role="alert">
              {errors.phone.message}
            </span>
          ) : null}
        </label>
      </div>

      <label className={styles.label}>
        {t("email")}
        <input className={styles.input} type="email" {...register("email")} autoComplete="email" />
        {errors.email ? (
          <span className={styles.error} role="alert">
            {errors.email.message}
          </span>
        ) : null}
      </label>

      <label className={styles.label}>
        {t("interest")}
        <select className={styles.select} {...register("interest")}>
          <option value="">{t("interestNone")}</option>
          <option value="press">{t("interestPress")}</option>
          <option value="cylinder">{t("interestCylinder")}</option>
          <option value="service">{t("interestService")}</option>
          <option value="other">{t("interestOther")}</option>
        </select>
      </label>

      <label className={styles.label}>
        {t("message")}
        <textarea className={styles.textarea} rows={5} {...register("message")} />
        {errors.message ? (
          <span className={styles.error} role="alert">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      <button type="submit" className={styles.submit} disabled={status === "loading"}>
        {status === "loading" ? t("sending") : t("submit")}
      </button>

      {status === "ok" ? (
        <p className={styles.bannerOk} role="status">
          {t("success")}
        </p>
      ) : null}
      {status === "err" ? (
        <p className={styles.bannerErr} role="alert">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
