'use client'

import { IoMenu } from "react-icons/io5"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSiteContext } from "@/context/SiteContextProvider"
import { Label } from "../ui/label"












export default function MainMenu() {

    const { cart } = useSiteContext()

    const pathname = usePathname()

    const [isMenuSheetOpen, setIsMenuSheetOpen] = useState<boolean>(false)

    useEffect(() => {
        setIsMenuSheetOpen(false)
    }, [pathname])
    return (
        <div
        className="bg-primary text-primary-foreground sticky top-0 left-0 z-50"
        >
            <div
            className="flex flex-row items-center mx-auto container justify-between w-full p-4"
            >
                {/* Desktop menu */}
                <div
                className="hidden lg:flex flex-row items-center gap-4"
                >
                    <a
                    href={'/'}
                    className={buttonVariants({ variant: 'ghost' })}
                    >
                        Ana Sayfa
                    </a>
                    <Link
                    href={'/cart'}
                    className={buttonVariants({ variant: 'ghost' })}
                    >
                        Sepetim
                        {cart.length > 0 && (
                            <div
                            className="flex w-6 h-6 rounded-full shrink-0 bg-destructive text-primary-foreground items-center justify-center"
                            >
                                <Label>
                                    {cart.length <= 9 ? cart.length : '+9'}
                                </Label>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Mobile menu */}
                <div
                className="flex lg:hidden"
                >
                    <Sheet
                    open={isMenuSheetOpen}
                    onOpenChange={setIsMenuSheetOpen}
                    >
                        <SheetTrigger
                        aria-label={'Menu Düğmesi'}
                        >
                            <IoMenu/>
                        </SheetTrigger>
                        <SheetContent
                        side="left"
                        >
                            <SheetHeader>
                                <SheetTitle>
                                    Menü
                                </SheetTitle>
                            </SheetHeader>
                            <Separator/>
                            <a
                            href={'/'}
                            className={buttonVariants({ variant: 'link', className: '!justify-start' })}
                            >
                                Ana Sayfa
                            </a>
                            <Link
                            href={'/cart'}
                            className={buttonVariants({ variant: 'link', className: '!justify-start' })}
                            >
                                Sepetim
                                {cart.length > 0 && (
                                    <div
                                    className="flex w-6 h-6 rounded-full shrink-0 bg-destructive text-primary-foreground items-center justify-center"
                                    >
                                        <Label>
                                            {cart.length <= 9 ? cart.length : '+9'}
                                        </Label>
                                    </div>
                                )}
                            </Link>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}