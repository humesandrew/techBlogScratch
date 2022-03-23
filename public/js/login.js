// put logic for rendering page here //////////////////////////////////////////////////////////////////




	const emailField = document.getElementById('emailInputForm');
	const passwordField = document.getElementById('passwordInputForm');
	const loginButton = document.getElementById('loginButton');
	loginButton.on('click', async function (event) {
		event.preventDefault();
		await $.post('/api/login', {
			email: emailField.val(),
			username: usernameField.val(),
			password: passwordField.val(),
		});

		window.location.href = '/homepage';
	});
