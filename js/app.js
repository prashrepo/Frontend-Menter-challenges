function validateEmail() {
    let email = document.getElementById('email').value;
    let format =  /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    let message = document.querySelector('.message');
    let success = document.querySelector('.message__success');
    let error = document.getElementById('email');

    if ((format.test(email))) {
        // message.style.display='none';
        error.value='';
        event.preventDefault();
        message.style.display='none';
        error.classList.remove('error');
        success.style.display="initial"
        
        setTimeout(() => {
            success.style.display='none';
        }, 2500);

    return true;
    } else {
        message.style.display='initial';
        error.classList.add('error');
        success.style.display='none';
        return false;
    }
}
