'use client';

import React, { useState, useRef } from 'react';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconUpload, IconEdit, IconDownload } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import * as XLSX from 'xlsx';
import LineNumberedTextarea from './LineNumberedTextarea';
import Icon from './Icon';

const UploadComponent = ({ title, fileContent, setFileContent }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualContent, setManualContent] = useState(fileContent);
  const [fileType, setFileType] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    readFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    readFile(file);
  };

  const readFile = (file) => {
    setFileType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      if (file.type === 'text/plain') {
        setFileContent(data);
      } else if (
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel'
      ) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheets = {};
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          sheets[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        });
        setFileContent(JSON.stringify(sheets, null, 2));
      }
    };
    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const handleManualInputChange = (e) => {
    const content = e.target.value;
    setManualContent(content);
    setFileContent(content);
    setFileType('text/plain');
  };

  const toggleInputMode = () => {
    setIsManualInput(!isManualInput);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const downloadFile = (content, fileName, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownload = () => {
    if (fileContent) {
      if (fileType === 'text/plain') {
        downloadFile(fileContent, 'file.txt', 'text/plain');
      } else {
        const sheets = JSON.parse(fileContent);
        const workbook = XLSX.utils.book_new();
        Object.keys(sheets).forEach(sheetName => {
          const ws = XLSX.utils.aoa_to_sheet(sheets[sheetName]);
          XLSX.utils.book_append_sheet(workbook, ws, sheetName);
        });
        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        const excelBlob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        downloadFile(excelBlob, 'file.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      }
    }
  };

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2>{title}</h2>
          <Tooltip
            content="1. mucoin 永远不会记录任何私钥，代码开源可查！
                            2. 请使用小额钱包，建议随取随用，请勿存放大资金
                            3. 私钥请安全保存，钱包不随意授权"
          >
            <div className="flex bg-green-100 text-green-600 items-center text-[12px] p-1">
              <Icon size={14} type={'icon-anquantishi'} />
              <span>安全提示</span>
            </div>
          </Tooltip>
        </div>
        <Button
          onClick={toggleInputMode}
          icon={isManualInput ? <IconUpload /> : <IconEdit />}
        >
          {isManualInput ? '切换到拖拽上传' : '切换到手动输入'}
        </Button>
      </div>
      {isManualInput ? (
        <div className="relative p-4 border-dashed border-2 bg-white  rounded-lg" style={{ height: '200px' }}>
          <LineNumberedTextarea
            value={manualContent}
            onChange={handleManualInputChange}
            style="h-[160px]"
          />
        </div>
      ) : (
        <div
          className={classNames(
            'border-dashed border-2 rounded-lg p-4 relative hover:bg-blue-100',
            { 'bg-white': !isDragging, 'border-blue-500': isDragging }
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          style={{ height: '200px' }}
        >
          <input
            type="file"
            accept=".txt, .xlsx, .xls"
            onChange={handleChange}
            className="hidden"
            ref={fileInputRef}
          />
          <label
            htmlFor="fileInput"
            className="w-full h-full flex items-center justify-center cursor-pointer"
          >
            <Button icon={<IconUpload />} theme="solid">
              拖拽文件到这里或点击上传
            </Button>
          </label>

        </div>
      )}
      <div className="mt-4 flex justify-between">
        <span className="text-zinc-400 text-[14px]">{isManualInput ? '每一行输入一个私钥' : '支持文件类型：  Excel / Txt'}</span>
        <Button
              icon={<IconDownload />}
              onClick={handleDownload}
              disabled={!fileContent}
            >
              下载文件
            </Button>
      </div>

    </div>
  );
};

export default UploadComponent;