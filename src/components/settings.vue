<template>
    <div class="page">
        <div class="settingsForm shadow p-3 mb-5 bg-white rounded">
            <form>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="user.Email" required max:100>
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="user.FirstNm" required max:100>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="user.LastNm" required max:100>
                </div>
                <hr>
                <div class="form-group">
                    <label><h5>Date of Birth</h5></label>
                    <date-dropdown :yearOptions="dobDropdownYearOptions"></date-dropdown>
                </div>
                <hr>
                <div class="form-group">
                    <label><h5>Budget Target Date</h5></label>
                    <date-dropdown :yearOptions="budgetDropdownYearOptions"></date-dropdown>
                </div>
                <hr>
                <div class="form-group">
                    <label>New Password</label>
                    <input type="password" class="form-control" v-model="user.Password" max:100>
                </div>
                <div class="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" class="form-control" v-model="user.ConfirmPassword">
                </div>
                <button type="button" class="btn btn-outline-dark" @click="update">Update</button>
                <button type="button" class="btn btn-outline-dark" @click="reset">Reset</button>
            </form>
        </div>
        <success-modal v-if="successModal.display" :options="successModal" @close="closeModal('success')"></success-modal>
        <error-modal v-if="errorModal.display" :options="errorModal" @close="closeModal('error')"></error-modal>
    </div>
</template>

<script>
import moment from 'moment';
import Modal from './modals/basicModal';
import DatesDropdown from './dropdowns/dateSelectionDropdown';

export default {
    beforeCreate: function () {
        if (!this.$session.exists()){
            console.error('Unauthenticated. Redirecting to Welcome')
            this.$router.push('/')
        }
    },

    components: {
        'success-modal': Modal,
        'error-modal': Modal,
        'date-dropdown': DatesDropdown
    },

    data() {
        return {
            user: {
                Email: '',
                FirstNm: '',
                LastNm: '',
                Password: '',
                ConfirmPassword: ''
            },
            backupUser: {
                Email: '',
                FirstNm: '',
                LastNm: '',
                Password: '',
                ConfirmPassword: ''
            },
            successModal: {
                display: false,
                type: 'Success',
                header: {text: 'Success'},
                body: {text: 'Successfully updated your details'}
            },
            errorModal: {
                display: false,
                type: 'Error',
                header: {text: 'Error'},
                body: {text: 'Failed to update settings due to the following error:', error: 'Debug Error'}
            },
            budgetDropdownYearOptions: {
                minYear: moment().year()
            },
            dobDropdownYearOptions: {
                asc: false,
                maxYear: moment().year()
            }
        }
    },

    methods: {
        update() {
            if(!this.isModified()){
                this.errorModal.body.error = "Nothing to update";
                this.errorModal.display = true;
            } else {
                if(this.user.Password !== this.user.ConfirmPassword){
                    this.errorModal.body.error = 'Passwords must match';
                    this.errorModal.display = true;
                } else if (this.user.Password !== '' && this.user.Password.lenght < 8) {
                    this.errorModal.body.error = 'Password must be at least 8 characters long';
                    this.errorModal.display = true;
                } else {
                    axios.put("/api/updateuser", this.user)
                        .then((res) => {
                            this.successModal.display = true;

                            this.user.Password = '';
                            this.user.ConfirmPassword = '';

                            for(const [key, value] of Object.entries(this.user)){
                                this.backupUser[key] = value;
                            }

                            this.$session.set('FirstNm', this.user.FirstNm);
                            this.$emit('updateSession');
                        }).catch((err) => {
                            this.errorModal.body.error = err.response.data.error;
                            this.errorModal.display = true;
                        })
                }
            }
        },

        isModified(){
            for (const [key, value] of Object.entries(this.backupUser)){
                if(this.user[key] !== this.backupUser[key]){
                    return true
                }
            }

            return false
        },

        reset() {
            for (const [key, value] of Object.entries(this.backupUser)){
                this.user[key] = value
            }
        },

        closeModal(name) {
            if(name === 'success'){
                this.successModal.display = false;
            } else {
                this.errorModal.display = false;
            }
        }
    },

    mounted() {
        this.backupUser.firstname = this.user.firstname
        axios.get("/api/updateuser")
            .then((res) => {
                for (const [key, value] of Object.entries(res.data.user)){
                    this.user[key] = value;
                    this.backupUser[key] = value;
                }
            }).catch((err) => {
                this.errorModal.body.text = err.response.data
                this.errorModal.display = true;
                console.error(err.response.data);
            })
    }
}
</script>