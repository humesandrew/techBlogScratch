



	const postTitleField = document.querySelector('input[name = "postTitle"]').value;
	const postBodyField = document.querySelector('textarea[name = "postBody"]').value;
	const createBtn = document.getElementById('createPostBtn');
	createBtn.on('click', async function (event) {
		event.preventDefault();
		await fetch(`/api/post`, {
			method: 'POST',
            body: JSON.stringify({
                title, body, 
            }),

            headers: { 'Content-Type': 'application/json'},
		});

		document.location.replace('/homepage');
	});

