"use client";

import { useEffect, useState } from "react";

type ConstructionDocument = {
  id: string;
  title: string;
  documentType?: string;
  fileUrl?: string;
  extractedText?: string;
  createdAt: string;
};

export default function ObrasDocumentosPage() {
  const [documents, setDocuments] = useState<ConstructionDocument[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadDocuments() {
    const response = await fetch("/api/obras/documents");
    const data = await response.json();

    setDocuments(data.documents || []);
  }

  async function uploadDocument() {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title || file.name);
      formData.append("documentType", documentType || file.type);

      const response = await fetch("/api/obras/documents", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Erro ao enviar documento.");
        return;
      }

      setFile(null);
      setTitle("");
      setDocumentType("");

      await loadDocuments();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC OBRAS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Documentos da Obra
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            Upload, organização, OCR e análise documental de contratos, notas,
            ART, memoriais, projetos, imagens, PDFs e evidências técnicas.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Documentos</p>
            <strong className="mt-2 block text-3xl font-black">
              {documents.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Com OCR/texto</p>
            <strong className="mt-2 block text-3xl font-black">
              {documents.filter((item) => item.extractedText).length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Base documental</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              MySQL
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">IA/OCR</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              Ativo
            </strong>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Enviar documento</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Título do documento"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
              placeholder="Tipo: contrato, nota, ART, memorial..."
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              type="file"
              accept=".pdf,.txt,.png,.jpg,.jpeg,.webp"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300"
            />

            <button
              onClick={uploadDocument}
              disabled={!file || loading}
              className="rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? "Enviando e analisando..." : "Enviar documento"}
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {documents.length ? (
            documents.map((document) => (
              <article
                key={document.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">{document.title}</h2>

                    <p className="mt-2 text-sm text-slate-400">
                      {document.documentType || "Tipo não informado"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(document.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase text-cyan-300">
                    {document.extractedText ? "OCR OK" : "Sem OCR"}
                  </span>
                </div>

                {document.fileUrl && (
                  <p className="mt-4 text-sm font-bold text-cyan-300">
                    Arquivo salvo: {document.fileUrl}
                  </p>
                )}

                {document.extractedText && (
                  <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="mb-2 text-xs font-black uppercase text-slate-500">
                      Texto extraído
                    </p>

                    <p className="line-clamp-6 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {document.extractedText}
                    </p>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-500">
              Nenhum documento enviado ainda.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
