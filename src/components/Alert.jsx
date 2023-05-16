

const Alert = ({alert}) => {

  return (
    <div className={`${alert.error ? "from-red-600 to-red-800" : "from-green-600 to-green-800"} bg-gradient-to-br text-center p-3 rounded-lg text-white font-bold text-sm mb-5`}>{alert.msg}</div>
  )
}

export default Alert