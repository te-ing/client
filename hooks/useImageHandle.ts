import React, { useState } from 'react';

import { readFile } from '../utils/readFile';

const useImageHandle = () => {
    

    const storeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentFile = (e.target as HTMLInputElement).files[0];
        const readedFile = currentFile && await readFile(currentFile);


    }
}

export default useImageHandle;