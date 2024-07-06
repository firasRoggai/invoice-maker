"use client";

import { useFormContext } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import { FaRegWindowClose } from "react-icons/fa";
import { useFilePicker } from 'use-file-picker';
import { FileAmountLimitValidator, FileSizeValidator, ImageDimensionsValidator } from 'use-file-picker/validators';
import { Button } from '~/components/ui/button';


const ImagePicker = () => {
    const { setValue, watch } = useFormContext()

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: false,
        validators: [
            new FileAmountLimitValidator({ max: 1 }),
            new FileSizeValidator({ maxFileSize: 90 * 1024 * 1024 /* 50 MB */ }),
            new ImageDimensionsValidator({
                maxHeight: 4100, // in pixels
                maxWidth: 4100, // in pixels
                minHeight: 300,
                minWidth: 300,
            }),
        ],
        onFilesSuccessfullySelected: ({ filesContent }) => {
            if (!filesContent[0]) return
            setValue("logo", filesContent[0].content)
        },
        onFilesRejected: () => {
            console.error("errors: " , errors);
            console.log("The image you uploaded is not in a file type we accept. Please use a JPEG, PNG, or GIF.");
            window.alert("The image you uploaded is not in a file type we accept. Please use a JPEG, PNG, or GIF.")
        }
    });

    if (loading) {
        return <div className='h-40 w-60 bg-gray-100 border-black border border-spacing-2 text-xl flex items-center justify-center'>
            Loading
        </div>;
    }

    const logo = watch("logo")

    return (
        <div>
            {logo ?
                <div className='h-40 w-60 relative'>
                    <button
                        onClick={() => {
                            setValue("logo", "")
                        }}
                        className='absolute top-0 right-0 text-black text-xl rounded-md bg-red-200'>
                        <FaRegWindowClose />
                    </button>

                    <img className='w-full h-full object-contain' src={logo} alt="" />
                </div>
                :
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        openFilePicker()
                    }}
                    className='h-40 w-60 cursor-pointer flex justify-center items-center bg-gray-100 border-black border border-spacing-2 text-xl'>
                    +Add Your Logo
                </button>
            }
            <span className='text-xs text-gray-500'>Ideal size is 500x500</span>
        </div>
    );
}

export default ImagePicker;