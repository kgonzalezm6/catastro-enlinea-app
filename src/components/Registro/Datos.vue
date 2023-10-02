<template>
	<div>

		<v-form v-model="valid" ref="form">
			<v-row class="mb-4 mt-1">
				<v-col cols="12" md="6">
					<v-text-field v-model="data.nombres" :rules="[v => !!v]" autocomplete="off" hide-details outlined
						label="Nombres"></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field v-model="data.apellidos" :rules="[v => !!v]" autocomplete="off" hide-details outlined
						label="Apellidos"></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-select v-model="data.sexo" :rules="[v => !!v]" :items="sexo" autocomplete="off" hide-details outlined
						label="Género"></v-select>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field v-model="data.telefono" :rules="[v => !!v]" autocomplete="off" hide-details outlined
						label="Teléfono"></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-textarea :rows="3" v-model="data.direccion" :rules="[v => !!v]" autocomplete="off" hide-details
						outlined label="Dirección"></v-textarea>
				</v-col>
				
				<v-col cols="12" md="6" v-if="!formulario_pagosenlinea">
					<v-text-field v-model="data.email" :rules="[v => !!v]" autocomplete="off" hide-details outlined
						:label="nombres_adjuntos[2] === 'Copia DPI del Gestor del proyecto ' ? 'Correo Electrónico del Gestor del Proyecto' : 'Correo Electrónico'"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6" v-if="!formulario_pagosenlinea">
					<v-text-field @click:append="() => { data.show_pass = !data.show_pass }"
						:append-icon="!data.show_pass ? 'mdi-eye' : 'mdi-eye-off'" v-model="data.password"
						:rules="[v => !!v]" :type="!data.show_pass ? 'password' : 'text'" autocomplete="off" hide-details
						outlined label="Contraseña"></v-text-field>
				</v-col>

				<!-- <v-col cols="12" md="6">
					<v-text-field @click:append="() => { data.show_pass = !data.show_pass }"
						:append-icon="!data.show_pass ? 'mdi-eye' : 'mdi-eye-off'" v-model="data.password"
						:rules="[v => !!v]" :type="!data.show_pass ? 'password' : 'text'" autocomplete="off" hide-details
						outlined label="Contraseña"></v-text-field>
				</v-col> -->
				<v-col cols="12" md="6">
					<v-text-field @click:append="() => { data.show_repite_pass = !data.show_repite_pass }"
						:append-icon="!data.show_repite_pass ? 'mdi-eye' : 'mdi-eye-off'" v-model="data.repite_password"
						:rules="[v => !!v]" :type="!data.show_repite_pass ? 'password' : 'text'" autocomplete="off"
						hide-details outlined label="Repita su contraseña"></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field v-model="data.dpi" :rules="[v => !!v]" autocomplete="off" hide-details outlined
						label="DPI"></v-text-field>
				</v-col>

				<!-- Requisitos especificos -->
				<v-col md="6" cols="12" v-for="(campo, key) in campos_especiales" :key="key">
					<v-row dense>
						<v-col v-if="campo.campo == 'representacion_legal'" cols="12">
							<v-text-field md="6" v-model="data.representacion_legal" :rules="[v => !!v]" autocomplete="off"
								hide-details outlined label="Nombre de la entidad"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'carne_abogado'" cols="12">
							<v-text-field v-model="data.carne_abogado" :rules="[v => !!v]" autocomplete="off" hide-details
								outlined label="Carné de Abogado"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'carne_valuador'" cols="12">
							<v-text-field v-model="data.carne_valuador" :rules="[v => !!v]" autocomplete="off" hide-details
								outlined label="Licencia No."></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'nom_inmobiliaria'" cols="12">
							<v-text-field v-model="data.nom_inmobiliaria" :rules="[v => !!v]" autocomplete="off"
								hide-details outlined label="Nombre de la empresa"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'nom_representante_inmobiliaria'" cols="12">
							<v-text-field v-model="data.nom_representante_inmobiliaria" :rules="[v => !!v]"
								autocomplete="off" hide-details outlined label="Nombre del representante de la empresa"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'telefono_inmobiliaria'" cols="12">
							<v-text-field v-model="data.telefono_inmobiliaria" :rules="[v => !!v]" autocomplete="off"
								hide-details outlined label="Telefono de la empresa"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'nom_propietario'" cols="12">
							<v-text-field v-model="data.nom_propietario" :rules="[v => !!v]" autocomplete="off"
								hide-details outlined label="Nombre completo del propietario"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'telefono_propietario'" cols="12">
							<v-text-field v-model="data.telefono_propietario" :rules="[v => !!v]" autocomplete="off"
								hide-details outlined label="Telefono del propietario"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'nom_gestor'" cols="12">
							<v-text-field v-model="data.nom_gestor" :rules="[v => !!v]" autocomplete="off"
								hide-details outlined label="Nombre del gestor del proyecto"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'telefono_gestor'" cols="12">
							<v-text-field v-model="data.telefono_gestor" :rules="[v => !!v]" autocomplete="off"
								hide-details outlined label="Telefono del gestor del proyecto"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'corrreo_gestor'" cols="12">
							<v-text-field v-model="data.corrreo_gestor" :rules="[v => !!v]" autocomplete="off"
								hide-details outlined label="Correo electronico del gestor del proyecto"></v-text-field>
						</v-col>
						
					</v-row>
				</v-col>

				<!-- Adjuntar documentos -->
				<v-col cols="12" v-if="nombres_adjuntos.length > 0">
					<v-row>
						<v-col cols="12">
							<v-card outlined min-height="200">
								<v-card-text class="mb-0 pb-0">
									<v-file-input v-model="files" :rules="[v => !!v]" :show-size="1000" counter
										prepend-inner-icon="mdi-paperclip" prepend-icon="" multiple
										placeholder="Adjuntar archivos"></v-file-input>
								</v-card-text>
								<v-card-text class="mt-0">
									<span class="overline">Es necesario adjuntar los siguientes archivos: </span>
									<ul>
										<li v-for="(nombre, key) in nombres_adjuntos" :key="key">
											{{ nombre }}
										</li>
									</ul>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-col>

			</v-row>

			<v-divider class="mt-4"></v-divider>

			<v-row>
				<v-col>
					<v-btn :disabled="saving" :loading="saving"
						@click="pasos_registro.length >= step ? forward() : registrar()" color="primary">CONTINUAR</v-btn>

					<v-btn :disabled="saving" @click="back()" class="ml-2" text>ATRÁS</v-btn>
				</v-col>
			</v-row>
		</v-form>

	</div>
</template>



<script>

import Swal from 'sweetalert2'
import { mapGetters, mapState } from 'vuex'
export default {
	data() {
		return {
			step: 2,
			valid: true,
			
			data: {
				nombres: null,
				apellidos: null,
				sexo: null,
				telefono: null,
				direccion: null,
				email: this.$route.params.email,
				//email: null,
				password: null,
				repite_password: null,
				dpi: null,
				representacion_legal: null,
				carne_abogado: null,
				carne_valuador: null,
				show_pass: false,
				show_repite_pass: false,
				nom_inmobiliaria: null,
				nom_representante_inmobiliaria: null,
				telefono_inmobiliaria: null,
				nom_propietario: null,
				telefono_propietario: null,
				nom_gestor: null,
				telefono_gestor: null,
				corrreo_gestor:null
			},
			files: null,
		sexo: [
			{
				text: 'Hombre',
				value: 'H'
			},
			{
				text: 'Mujer',
				value: 'M'
			}
		],
		getemail: this.$route.params.email,
		formulario_pagosenlinea: false
		}

	},
methods: {
	forward(){
		let result = this.same_pass()

		if (result) {

			this.$refs.form.validate()

			if (this.valid) {

				this.$store.commit('setDatosFormulario', this.data)

				this.$store.commit('setFiles', this.files)

				if (this.cantidad_adjuntos != this.adjuntos.length) {

					Swal.fire(
						'Atención!',
						'El número de archivos adjuntos no coincide con los solicitados!',
						'info'
					)

					return

				}

				this.$store.commit('setStep', 3)



			}

		}

	},
	back(){
		this.$store.commit('setStep', 1)
	},
	registrar(){

		let result = this.same_pass()

		if (result) {

			this.$refs.form.validate()

			if (this.valid) {

				this.$store.commit('setDatosFormulario', this.data)

				this.$store.commit('setFiles', this.files)

				if (this.cantidad_adjuntos != this.adjuntos.length) {

					Swal.fire(
						'Atención!',
						'El número de archivos adjuntos no coincide con los solicitados!',
						'info'
					)

					return

				}

				this.$store.dispatch('createUser')

			}

		}

	},
	same_pass(){
		if (!this.getemail) {

			if (this.data.password == this.data.repite_password) {

				return true

			}

			Swal.fire({
				icon: 'error',
				title: 'Error...',
				text: 'Las contraseñas no coinciden!',
			})

		} else {
			if (this.data.password == this.data.repite_password) {

				return true

			}

		}

	},
	buscar(){
			if (this.getemail) {
				this.$store.dispatch('getCreatedUser', this.getemail)
				this.formulario_pagosenlinea = true
				this.$store.commit('setPagosEnlinea', true)
				this.$store.commit('setGetEmail', this.getemail)
			} else {
				this.formulario_pagosenlinea = false
				this.$store.commit('setPagosEnlinea', false)
				this.$store.commit('setGetEmail', null)
			}
			Swal.fire({
				icon: 'error',
				title: 'Error...',
				text: 'Las contraseñas no coinciden!',
			})


	}

},
	computed: {
			...mapGetters({
		nombres_adjuntos: 'getNombresAdjuntos',
		saving: 'getSaving',
		data: 'getDatosFormulario'
	}),
			...mapState({
		cantidad_adjuntos: state => state.registro.cantidad_adjuntos,
		adjuntos: state => state.registro.files,
		tipo_usuario: state => state.registro.tipo_usuario

	}),
			pasos_registro(){

			return this.$store.getters.getPasosRegistro

		},
		campos_especiales(){

			return this.$store.getters.getCamposEspeciales

		},
		tipo_usuario(){
			return this
		}

	},
	mounted(){

		//console.log(this.tipo_usuario)

	}
}
</script>

<style></style>