"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps{
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }

  if (!isMounted) {
    return null;
  }
  
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4"/>
                            </Button>
                        </div>
                        <Image 
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            
            {/*onUpload id depricated, instead use onSuccess which works*/}

            {/*Update when you are in product page where you have to upload multiple files,
            onSuccess reloads everytime whenever multiple images are uploaded,
            so it only reders the latest one which was uploaded. */}
            <CldUploadWidget onUpload={onUpload} uploadPreset="szkfnvvh"> 
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return(
                        <Button
                        type="button"
                        disabled={disabled}
                        variant="secondary"
                        onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2"/>
                            Upload an image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )

}

export default ImageUpload;