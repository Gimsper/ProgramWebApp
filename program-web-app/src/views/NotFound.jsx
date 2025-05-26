import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div style={{
                height: "100%",
                width: "100%",
                display: "grid",
                placeContent: "center"
            }}>
                <h1>No se ha encontrado la ruta</h1>
                <section style={{
                    width: "100%",
                    display: "grid",
                    placeContent: "center",
                }}>
                    <Link to='/' className="App-link">Volver al inicio</Link>
                </section>
            </div>
        </>
    );
}

export { NotFound };