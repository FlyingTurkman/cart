'use client'

import { IoMenu } from "react-icons/io5"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"












export default function MainMenu() {

    const router = useRouter()

    const pathname = usePathname()

    const [isMenuSheetOpen, setIsMenuSheetOpen] = useState<boolean>(false)

    useEffect(() => {
        setIsMenuSheetOpen(false)
    }, [pathname])
    return (
        <div
        className="bg-primary text-primary-foreground sticky top-0 left-0"
        >
            <div
            className="flex flex-row items-center mx-auto container justify-between w-full p-4"
            >
                {/* Desktop menu */}
                <div
                className="hidden lg:flex flex-row items-center gap-4"
                >
                    <Link
                    href={'/'}
                    className={buttonVariants({ variant: 'ghost' })}
                    >
                        Ana Sayfa
                    </Link>
                    <a
                    href={'/cart'}
                    className={buttonVariants({ variant: 'ghost' })}

                    >
                        Sepetim
                    </a>
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
                            <Link
                            href={'/'}
                            className={buttonVariants({ variant: 'link', className: '!justify-start' })}
                            >
                                Ana Sayfa
                            </Link>
                            <a
                            href={'/cart'}
                            className={buttonVariants({ variant: 'link', className: '!justify-start' })}
                            >
                                Sepetim
                            </a>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}