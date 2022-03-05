import React, { Component } from "react"
import { variables } from "./Variables";

export class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumes: [],
            tituloModal: '',
            IdAlbum: 0,
            NombreAlbum: '',
            GeneroAlbum: '',
            ArtistaAlbum: '',
            YearAlbum: '',
            ImagenAlbum: ''
        }
    }

    refrescarLista() {
        fetch(variables.API_URL + 'album')
            .then(response => response.json())
            .then(data => {
                this.setState({ albumes: data })
            });
    }

    componentDidMount() {
        this.refrescarLista();
    }
    cambiarNombre = (e) => {
        this.setState({ NombreAlbum: e.target.value })
    }
    cambiarGenero = (e) => {
        this.setState({ GeneroAlbum: e.target.value })
    }
    cambiarArtista = (e) => {
        this.setState({ ArtistaAlbum: e.target.value })
    }
    cambiarYear = (e) => {
        this.setState({ YearAlbum: e.target.value })
    }
    cambiarImagen = (e) => {
        this.setState({ ImagenAlbum: e.target.value })
    }
    addClick() {
        this.setState({
            tituloModal: "Agregar Album",
            IdAlbum: 0,
            NombreAlbum: '',
            GeneroAlbum: '',
            ArtistaAlbum: '',
            YearAlbum: "",
            ImagenAlbum: ''
        })
    }
    editClick(alb) {
        this.setState({
            tituloModal: "Editar Album",
            IdAlbum: alb.id,
            NombreAlbum: alb.Nombre,
            GeneroAlbum: alb.Genero,
            ArtistaAlbum: alb.Artista,
            YearAlbum: alb.Year,
            ImagenAlbum: alb.Imagen
        })
    }
    crearClick() {
        fetch(variables.API_URL + "album", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Nombre: this.state.NombreAlbum,
                Genero: this.state.GeneroAlbum,
                Artista: this.state.ArtistaAlbum,
                Year: this.state.YearAlbum,
                Imagen: this.state.ImagenAlbum,
            })
        })
            .then((res) => res.json()).then((result) => {
                alert(result);
                this.refrescarLista();
            }, (err) => {
                alert("Intento fallido");
            }
            )
    }

    actualizarClick() {
        fetch(variables.API_URL + "album", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: this.state.IdAlbum,
                Nombre: this.state.NombreAlbum,
                Genero: this.state.GeneroAlbum,
                Artista: this.state.ArtistaAlbum,
                Year: this.state.YearAlbum,
                Imagen: this.state.ImagenAlbum
            })
        })
            .then((res) => res.json()).then((result) => {
                alert(result);
                this.refrescarLista();
            }, (error) => {
                alert("Intento fallido");
            }
            )
    }
    eliminarClick(id) {
        if (window.confirm("¿Desea eliminar el registro?")) {
            fetch(variables.API_URL + "/albumes/" + id, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        alert(result);
                        this.refreshList();
                    },
                    (err) => {
                        alert("Intento fallido");
                    }
                );
        }
    }
    render() {
        const {
            albumes,
            tituloModal,
            IdAlbum,
            NombreAlbum,
            GeneroAlbum,
            ArtistaAlbum,
            YearAlbum,
            ImagenAlbum
        } = this.state;

        return (
            <div>
                <button type='button'
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle='modal'
                    data-bs-target='#ejemploModal'
                    onClick={() =>{ this.addClick();}}>
                    Agregar Album
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Genero</th>
                            <th>Artista</th>
                            <th>Year</th>
                            <th>Imagen</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albumes.map((alb) =>(
                            <tr key={alb.Id}>
                                <td>
                                    {alb.Id}
                                </td>
                                <td>
                                    {alb.Nombre}
                                </td>
                                <td>
                                    {alb.Genero}
                                </td>
                                <td>
                                    {alb.Artista}
                                </td>
                                <td>
                                    {alb.Year}
                                </td>
                                <td>
                                    {alb.Imagen}
                                </td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle='modal'
                                        data-bs-target='#ejemploModal'
                                        onClick={() => this.editClick(alb)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="modal fade" tabIndex="-1" id="ejemploModal" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{tituloModal}</h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>


                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Nombre Album</span>
                                    <input type='text' className="form-control"
                                        value={NombreAlbum}
                                        onChange={this.cambiarNombre} />

                                </div>
                                <div>
                                    <span className="input-group-text">Genero Album</span>
                                    <input type='text' className="form-control"
                                        value={GeneroAlbum}
                                        onChange={this.cambiarGenero} />
                                 

                                </div>
                                <div>
                                    <span className="input-group-text">Artista Album</span>
                                    <input type='text' className="form-control"
                                        value={ArtistaAlbum}
                                        onChange={this.cambiarArtista} />
                                </div>
                                <div>
                                    <span className="input-group-text">Year Album</span>
                                    <input type='Date' className="form-control"
                                        value={YearAlbum}
                                        onChange={this.cambiarYear} />
                                </div>
                                <div>
                                    <span className="input-group-text">Imagen Album</span>
                                    <input type='text' className="form-control"
                                        value={ImagenAlbum}
                                        onChange={this.cambiarImagen} />
                                </div>


                                {IdAlbum === 0 ? (
                                    <button
                                        type="button" className="btn btn-primary float-start"
                                        onClick={() => this.crearClick()}> Crear
                                    </button>
                                ) : null
                                }

                                {IdAlbum !== 0 ? (
                                    <button type='button' className='btn btn-primary float-start' 
                                    onClick={() => this.actualizarClick()}>Actualizar</button>
                                ) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}