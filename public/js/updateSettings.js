/*eslint-disable*/
import { showAlert } from './alert.js';

// type is either 'password' or 'data'
const updateSettings = async (type, formData = null) => {
  const url =
    type === 'password'
      ? '/api/v1/users/updateMyPassword'
      : '/api/v1/users/updateMe';

  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;

  const data =
    type === 'data' ? formData : { passwordCurrent, password, passwordConfirm };

  try {
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} is updated successfully!`);
    }

    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  } catch (err) {
    showAlert('error', err.response.data.message);
    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
  }
};

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);
    updateSettings('data', form);
  });
if (userPasswordForm)
  userPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    updateSettings('password');
  });
