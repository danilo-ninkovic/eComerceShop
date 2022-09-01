import React from 'react'
import { Alert } from 'react-bootstrap'
// Komponenta za message alert - custom
//u "children" ide message iz error-a u try-catch-u
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
