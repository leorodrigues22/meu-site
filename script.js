const form = document.getElementById("form-agendamento");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: nome.value,
    cnpj: cnpj.value,
    email: email.value,
    telefone: telefone.value,
    data: data.value
  };

  const res = await fetch("/agendar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  const resposta = await res.json();

  if (resposta.status === "ok") {
    alert("Agendamento salvo com sucesso!");
    form.reset();
  } else {
    alert(resposta.msg);
  }
});
