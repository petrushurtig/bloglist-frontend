const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return(
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              name="username"
              onChange={handleUsernameChange}
              />
              <label>Password</label>
              <input 
                type="password"
                value={password}
                name="password"
                onChange={handlePasswordChange}
              />
          </div>
          <button type="submit">login</button>
        </form>
        </div>
    )
}
export default LoginForm