const Notification = ({error, message}) => {
    if(message !== null)
    return (
      <>
      {error === true
        ?
      <div className='errorMessage'>
        {message}
      </div>
      : <div className='successMessage'>
        {message}
      </div>
      }
      </>
    )
    return null;
  }
export default Notification