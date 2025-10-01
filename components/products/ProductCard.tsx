'use client'

import { cartProductType } from "@/types"
import { Card, CardContent, CardDescription } from "../ui/card"
import Image from "next/image"
import { imageLoader } from "@/lib/src/imageLoader"
import { Label } from "../ui/label"
import ProductStars from "./ProductStars"
import { Button } from "../ui/button"
import { IoAdd, IoRemove } from "react-icons/io5"
import { useState } from "react"













export default function ProductCard({
    product
}: {
    product: cartProductType
}) {

    const [count, setCount] = useState<number>(product.count)
    return (
        <Card>
            <CardContent>
                <div
                className="flex flex-col lg:flex-row items-start"
                >
                    <div
                    className="w-32 h-32 lg:w-64 lg:h-64 aspect-square shrink-0"
                    >
                        <Image
                        width={256}
                        height={256}
                        alt={`${product.title} image`}
                        src={product.image}
                        loader={imageLoader}
                        className="w-full aspect-square object-contain"
                        />
                    </div>
                    <div
                    className="flex flex-col gap-2"
                    >
                        <Label>
                            <b>{product.title}</b>
                        </Label>
                        <CardDescription
                        className="line-clamp-3"
                        >
                            {product.description}
                        </CardDescription>
                        <div
                        className="flex flex-row items-center gap-2"
                        >
                            <ProductStars
                            stars={product.rating.rate}
                            />
                            <Label>
                                ({product.rating.count})
                            </Label>
                        </div>
                         <div
                        className="flex flex-row items-center gap-4"
                        >
                            <Button
                            variant={'outline'}
                            size={'icon'}
                            >
                                <IoRemove/>
                            </Button>
                            <Label
                            className="text-xl"
                            >
                                {count}
                            </Label>
                            <Button
                            variant={'outline'}
                            size={'icon'}
                            >
                                <IoAdd/>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}