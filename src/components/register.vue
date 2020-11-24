<template>
    <div class="loginForm shadow p-3 mb-5 bg-white rounded">
        <form>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" v-model="form.Email" required max:100>
            </div>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="form.FirstNm" required max:100>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" v-model="form.LastNm" required max:100>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="form.Password" required max:100>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="form.ConfirmPassword" required max:100>
            </div>
            <button type="button" class="btn btn-outline-dark" @click="submit">Register</button>
        </form>
        <error-modal v-if="errorModal.display" :options="errorModal" @close="closeModal('error')"></error-modal>
    </div>
</template>

<script>
import Modal from './modals/basicModal';
import moment from 'moment';

export default {
    data(){
        return {
            form: {
                Email: '',
                FirstNm: '',
                LastNm: '',
                Password: '',
                ConfirmPassword: '',
                BudgetTargetDate: moment().startOf('day').add(1, 'y').format()
            },
            errorModal: {
                display: false,
                type: 'Error',
                header: {text: 'Error'},
                body: {text: 'Failed to register due to the following error:', error: 'Debug Error'}
            }
        }
    },

    components: {
        'error-modal': Modal
    },

    methods:{
        submit(){
            if(this.form.Password !== this.form.ConfirmPassword){
                this.errorModal.body.error = 'Passwords must match';
                this.errorModal.display = true;
            } else if (this.form.Password !== '' && this.form.Password.lenght < 8) {
                this.errorModal.body.error = 'Password must be at least 8 characters long';
                this.errorModal.display = true;
            } else {
                axios.put("/api/register", this.form)
                    .then((res) => {
                        this.$session.start();
                        this.$session.set('FirstNm', this.form.FirstNm);
                        this.$session.set('BudgetTargetDate', moment(this.form.BudgetTargetDate).format('YYYY-MM-DD'));
                        this.$router.push('/home');
                    }).catch((err) => {
                        this.errorModal.body.error = err.response.data.error;
                        this.errorModal.display = true;
                    })
            }
        }
    }
}
</script>