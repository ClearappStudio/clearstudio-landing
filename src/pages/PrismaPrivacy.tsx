import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import en from "./Prisma-privacy-en.html?raw";
import esContent from "./Prisma-privacy-es.html?raw";
import "./DaylightHelp.css";
export default function PrismaPrivacy() { const [search] = useSearchParams(); const es = search.get("lang") === "es"; useEffect(() => { const old = document.title; document.title = "PRISMA · Privacy · Clear Studio"; return () => {document.title=old;}; }, []); return <article className="daylight-help" lang={es ? "es" : "en"}><nav className="dh-nav"><Link to="/projects/prisma">← PRISMA</Link><div><Link to={es ? "/projects/prisma/privacy" : "/projects/prisma/privacy?lang=es"}>{es ? "English" : "Español"}</Link></div></nav><div dangerouslySetInnerHTML={{__html:es ? esContent : en}} /></article>; }
