<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/app.css">
    <title>App</title>
</head>
<body>
  <div class='main--reset-password'>
    <div class='main__content'>
    <h1 class='mb-4'> Reset Password</h1>

      <form action="/reset-password" method="POST">
        <div class='mb-3'>
          <label for='email' class='form-label fw-bold'>
            Email
          </label>
          <input
            type='email'
            class='form-control form-control-sm'
            id='email'
            name='email'
            required
            maxlength='255'
          />
        </div>
        <div class='mb-2'>
          <label for='password' class='form-label fw-bold'>
            New Password
          </label>
          <input
            type='password'
            class='form-control form-control-sm'
            id='password'
            name='password'
            required
            minlength='5'
            maxlength='50'
            placeholder='Minimum 5 characters long'
          />
        </div>
        <div class='mb-3'>
          <label for='password' class='form-label fw-bold'>
            Confirm Password
          </label>
          <input
            id='confirm_password'
            type='password'
            class='form-control form-control-sm'
            name='confirm_password'
            required
            placeholder='Re-enter password'
          />
        </div>
        <button type='submit' class='btn btn-primary px-4 mb-3'>
          Submit
        </button>

        <input type="text" name='token' value= "ahsdjahk2131" hidden/>
      </form>
    </div>
  </div>
</body>
</html>
