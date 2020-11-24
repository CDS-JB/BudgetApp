<template>
  	<div class="loginForm shadow p-3 mb-5 bg-white rounded">
		<form>
			<div class="form-group">
				<label>Email <small class="text-danger">*</small></label>
				<input type="text" class="form-control" :style="error.display ? 'border-color: red' : ''" v-model="form.Email" required>
			</div>
			<div class="form-group">
				<label>Password <small class="text-danger">*</small></label>
				<input type="password" class="form-control" :style="error.display ? 'border-color: red' : ''" v-model="form.Password" required>
			</div>
			<small v-if="error.display" class="form-text text-danger">{{error.message}}</small>
			<button type="button" class="btn btn-outline-dark" style="margin-top: 10px;" @click="submit">Login</button>
		</form>
  	</div>
</template>

<script>
import moment from 'moment';

export default {
  	data() {
    	return {
      		form: {
				Email: "",
				Password: ""
			},
			error: {
				display: false,
				message: 'Debug Error'
			}
    	}
  	},

	methods: {
		submit() {
			axios.post("api/login", this.form)
				.then((res) => {
					this.$session.start();
					this.$session.set('FirstNm', res.data.FirstNm);
					this.$session.set('BudgetTargetDate', moment(res.data.BudgetTargetDate).format('YYYY-MM-DD'));
					this.$router.push("/home");
				}).catch((err) => {
					this.form.Password = '';
					this.error.message = err.response.data.error;
					this.error.display = true;
				});
		},
	},
};
</script>