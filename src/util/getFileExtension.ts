export const getFileExtension = (fileName: string): string => {
    const dotInd = fileName.lastIndexOf('.');
    if (dotInd === -1) return '';

    return fileName.slice(dotInd + 1);
};
