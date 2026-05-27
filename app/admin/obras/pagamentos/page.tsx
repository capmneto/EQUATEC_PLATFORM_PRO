"use client";

import { useEffect, useMemo, useState } from "react";

type Payment = {
  id: string;
  title: string;
  amount: number;
  dueDate?: string;
  paid: boolean;
  createdAt: string;
};

function brl(value: number) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ObrasPagamentosPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => {
    const total = payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const paid = payments
      .filter((item) => item.paid)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return {
      total,
      paid,
      pending: total - paid,
      pendingCount: payments.filter((item) => !item.paid).length,
    };
  }, [payments]);

  async function loadPayments() {
    const response = await fetch("/api/obras/payments");
    const data = await response.json();

    setPayments(data.payments || []);
  }

  async function createPayment() {
    if (!form.title.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/obras/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          amount: Number(form.amount || 0),
          dueDate: form.dueDate || null,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Erro ao criar pagamento.");
        return;
      }

      setForm({
        title: "",
        amount: "",
        dueDate: "",
      });

      await loadPayments();
    } finally {
      setLoading(false);
    }
  }

  async function togglePayment(payment: Payment) {
    await fetch("/api/obras/payments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: payment.id,
        paid: !payment.paid,
      }),
    });

    await loadPayments();
  }

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC OBRAS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Pagamentos da Obra
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            Controle de parcelas, vencimentos, pagamentos realizados, pendências
            e base financeira operacional da obra.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total previsto</p>
            <strong className="mt-2 block text-2xl font-black">{brl(totals.total)}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Pago</p>
            <strong className="mt-2 block text-2xl font-black">{brl(totals.paid)}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Pendente</p>
            <strong className="mt-2 block text-2xl font-black">{brl(totals.pending)}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Itens pendentes</p>
            <strong className="mt-2 block text-3xl font-black">{totals.pendingCount}</strong>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Novo pagamento</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Descrição do pagamento"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400 md:col-span-2"
            />

            <input
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: event.target.value })}
              placeholder="Valor"
              type="number"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.dueDate}
              onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
              type="date"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <button
              onClick={createPayment}
              disabled={loading || !form.title.trim()}
              className="rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50 md:col-span-4"
            >
              {loading ? "Salvando..." : "Cadastrar pagamento"}
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {payments.length ? (
            payments.map((payment) => (
              <article
                key={payment.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">{payment.title}</h2>

                    <p className="mt-2 text-sm text-slate-400">
                      Vencimento:{" "}
                      {payment.dueDate
                        ? new Date(payment.dueDate).toLocaleDateString("pt-BR")
                        : "não informado"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Criado em {new Date(payment.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <button
                    onClick={() => togglePayment(payment)}
                    className={`rounded-full border px-4 py-2 text-xs font-black uppercase transition ${
                      payment.paid
                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                        : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                    }`}
                  >
                    {payment.paid ? "Pago" : "Pendente"}
                  </button>
                </div>

                <p className="mt-5 text-2xl font-black text-cyan-300">
                  {brl(payment.amount)}
                </p>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-500">
              Nenhum pagamento cadastrado ainda.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
