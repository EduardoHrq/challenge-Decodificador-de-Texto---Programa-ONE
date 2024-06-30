const textoTextArea = document.getElementById("texto");
const resultado = document.getElementById("resultado");
const btCopiar = document.getElementById("bt_copiar");

textoTextArea.addEventListener("input", (element) => {

  if(String(element.target.value).length > 0) {
    document.getElementById("bt_criptografar").removeAttribute("disabled")
    document.getElementById("bt_descriptografar").removeAttribute("disabled")
  }else {
    document.getElementById("bt_criptografar").setAttribute("disabled", "true")
    document.getElementById("bt_descriptografar").setAttribute("disabled", "true")
  }

})

function encriptografar() {

  if(String(textoTextArea.value).length == 0) {
    return
  }

  var textoParaEncriptar = String(textoTextArea.value).toLowerCase();

  const textoEncriptado = textoParaEncriptar.replace(
    /e|i|a|o|u/g,
    function (matched) {
      if (matched === "e") return "enter";
      if (matched === "i") return "imes";
      if (matched === "a") return "ai";
      if (matched === "o") return "ober";
      if (matched === "u") return "ufat";
    }
  );

  printarTextoManipulado(textoEncriptado);

  chamarAtencao();

  mostrarBotaoDeCopiar();

  textoTextArea.value = "";
}

function descriptografar() {

   if (String(textoTextArea.value).length == 0) {
     return;
   }

  var textoParaDecifar = String(textoTextArea.value).toLowerCase();

  const textoDecifrado = textoParaDecifar.replace(
    /enter|imes|ai|ober|ufat/g,
    function (matched) {
      if (matched === "enter") return "e";
      if (matched === "imes") return "i";
      if (matched === "ai") return "a";
      if (matched === "ober") return "o";
      if (matched === "ufat") return "u";
    }
  );

  printarTextoManipulado(textoDecifrado);

  chamarAtencao();

  mostrarBotaoDeCopiar();

  textoTextArea.value = "";
}

function printarTextoManipulado(texto) {
  if (window.innerWidth > 720) {
    resultado.innerHTML = texto;
    resultado.style.transform = "translate(-50%, 0%)";
    resultado.style.top = "1%";
  } else {
    resultado.innerHTML = texto;
    resultado.style.textAlign = "start"
  }
}

function chamarAtencao() {
  const areaDoResultado = document.getElementById("container_resultado");
  areaDoResultado.style.boxShadow = "0 0 0 8px #FFF";
  setTimeout(() => {
    areaDoResultado.style.boxShadow = "0 0 0 4px var(--cor-destaque)";
  }, 500);
}

function mostrarBotaoDeCopiar() {
  if (!btCopiar.style.display.match("block")) {
    btCopiar.style.display = "block";
    setTimeout(() => {
      btCopiar.style.scale = "1";
      btCopiar.style.opacity = "1";
    }, 300);
  }
}

btCopiar.addEventListener("click", () => {
  console.log("oi");
  navigator.clipboard.writeText(resultado.innerHTML);

  btCopiar.innerHTML = "Copiado!!";
  btCopiar.style.backgroundColor = "var(--bg-secondary)";
  btCopiar.style.color = "#000";

  setTimeout(() => {
    btCopiar.innerHTML = "Copiar!";
    btCopiar.style.backgroundColor = "var(--cor-destaque)";
    btCopiar.style.color = "#FFF";
  }, 1000);
});
