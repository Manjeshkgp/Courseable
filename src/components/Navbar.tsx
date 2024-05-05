import { FC, useState } from 'react'

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {
    const [open,setOpen] = useState<boolean>(false);
  return (
    <nav className='flex flex-col'>

    </nav>
  )
}

export default Navbar