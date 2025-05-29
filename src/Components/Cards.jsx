import React from 'react'

export const Cards = ({children,className=''}) => {
  return (
    <div className={`bg-white/60 backdrop-blur-md border-white/30 rounded-3xl shadow-lg p-6 $(className)`}>
        {children} {/* This is where the content will be rendered */ }
      
    </div>
  )
}
export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}
//export default Cards
