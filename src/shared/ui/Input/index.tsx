import type { InputHTMLAttributes } from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: IInput) => {
  return (
    <div className="bg-white p-4 rounded-xl">
      <input className="h-6 text-[#474747] placeholder-[#797979]" {...props} />
    </div>
  )
}
