'use client'
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";
import { Button, Image } from "@nextui-org/react";
import { CardHeader } from "@nextui-org/react"
import Aos from "aos"
import Link from "next/link"
import { heycow } from "@/images/hey_cow.svg"
export default function Header() {
    <>
        <Navbar>
            <NavbarBrand>
                <Image src={heycow} alt="ACME" width={40} height={40} />
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                <Link color="foreground" href="#">
                    Features
                </Link>
                </NavbarItem>
                <NavbarItem isActive>
                <Link href="#" aria-current="page">
                    Customers
                </Link>
                </NavbarItem>
                <NavbarItem>
                <Link color="foreground" href="#">
                    Integrations
                </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                <Button as={Link} color="primary" href="#" variant="flat">
                    Sign Up
                </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    </>
}