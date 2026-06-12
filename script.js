let dispositivos = JSON.parse(localStorage.getItem("dispositivos")) || [];

const lista = document.getElementById("lista");
const form = document.getElementById("form");
const buscar = document.getElementById("buscar");

function guardar(){
    localStorage.setItem("dispositivos",JSON.stringify(dispositivos));
}

function mostrar(texto=""){
    lista.innerHTML="";

    let filtrados = dispositivos.filter(d =>
        d.nombre.toLowerCase().includes(texto.toLowerCase())
    );

    filtrados.forEach(d=>{

        let clase="";

        if(d.temperatura>35) clase="alerta";
        else if(d.bateria<20) clase="bateria";
        else if(d.estado=="Inactivo") clase="inactivo";

        lista.innerHTML += `
        <div class="card ${clase}">
            <h3>${d.nombre}</h3>
            <p>Tipo: ${d.tipo}</p>
            <p>Ubicación: ${d.ubicacion}</p>
            <p>Temperatura: ${d.temperatura}°C</p>
            <p>Batería: ${d.bateria}%</p>
            <p>Estado: ${d.estado}</p>

            <button onclick="editar(${d.id})">Editar</button>
            <button onclick="eliminar(${d.id})">Eliminar</button>
        </div>
        `;
    });

    document.getElementById("total").textContent=dispositivos.length;
    document.getElementById("activos").textContent=
        dispositivos.filter(d=>d.estado=="Activo").length;

    document.getElementById("inactivos").textContent=
        dispositivos.filter(d=>d.estado=="Inactivo").length;

    document.getElementById("alertas").textContent=
        dispositivos.filter(d=>d.temperatura>35 || d.bateria<20).length;
}

form.addEventListener("submit",e=>{
    e.preventDefault();

    dispositivos.push({
        id:Date.now(),
        nombre:nombre.value,
        tipo:tipo.value,
        ubicacion:ubicacion.value,
        temperatura:+temperatura.value,
        bateria:+bateria.value,
        estado:estado.value
    });

    guardar();
    mostrar();
    form.reset();
});

function eliminar(id){
    dispositivos = dispositivos.filter(d=>d.id!=id);
    guardar();
    mostrar();
}

function editar(id){

    let d = dispositivos.find(x=>x.id==id);

    d.temperatura = prompt("Nueva temperatura",d.temperatura);
    d.bateria = prompt("Nueva batería",d.bateria);
    d.estado = prompt("Activo o Inactivo",d.estado);

    guardar();
    mostrar();
}

buscar.addEventListener("input",()=>{
    mostrar(buscar.value);
});

mostrar();
