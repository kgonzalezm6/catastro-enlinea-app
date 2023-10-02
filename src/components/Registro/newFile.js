import Swal from 'sweetalert2';
import { mapGetters, mapState } from 'vuex';

methods: {
forward(); {
let result = this.same_pass();

if (result) {

this.$refs.form.validate();

if (this.valid) {

this.$store.commit('setDatosFormulario', this.data);

this.$store.commit('setFiles', this.files);

if (this.cantidad_adjuntos != this.adjuntos.length) {

Swal.fire(
'Atención!',
'El número de archivos adjuntos no coincide con los solicitados!',
'info'
);

return;

}

this.$store.commit('setStep', 3);



}

}

};
back(); {
this.$store.commit('setStep', 1);
};
registrar(); {

let result = this.same_pass();

if (result) {

this.$refs.form.validate();

if (this.valid) {

this.$store.commit('setDatosFormulario', this.data);

this.$store.commit('setFiles', this.files);

if (this.cantidad_adjuntos != this.adjuntos.length) {

Swal.fire(
'Atención!',
'El número de archivos adjuntos no coincide con los solicitados!',
'info'
);

return;

}

this.$store.dispatch('createUser');

}

}

}
same_pass(); {

if (!this.getemail) {

if (this.data.password == this.data.repite_password) {

return true;

}

Swal.fire({
icon: 'error',
title: 'Error...',
text: 'Las contraseñas no coinciden!',
});

} else {
if (this.data.password == this.data.repite_password) {

return true;

}

}
buscar(); {

if (this.getemail) {
this.$store.dispatch('getCreatedUser', this.getemail);
this.formulario_pagosenlinea = true;
this.$store.commit('setPagosEnlinea', true);
this.$store.commit('setGetEmail', this.getemail);
} else {
this.formulario_pagosenlinea = false;
this.$store.commit('setPagosEnlinea', false);
this.$store.commit('setGetEmail', null);
}
Swal.fire({
icon: 'error',
title: 'Error...',
text: 'Las contraseñas no coinciden!',
});


}
}
computed: {
mapGetters({
nombres_adjuntos: 'getNombresAdjuntos',
saving: 'getSaving',
data: 'getDatosFormulario',
saving: 'getSaving'
}),
        ;
mapState({
cantidad_adjuntos: state => state.registro.cantidad_adjuntos,
adjuntos: state => state.registro.files
}),
pasos_registro(); {

return this.$store.getters.getPasosRegistro;

}
campos_especiales(); {

return this.$store.getters.getCamposEspeciales;

}

}
mounted(); {

this.buscar();

}
}
