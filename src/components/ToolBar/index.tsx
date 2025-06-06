import { useState } from 'react';
import * as S from './ToolBar.css';
import { FaPencil } from "react-icons/fa6";
import { FaPenRuler } from "react-icons/fa6";
import { FaEraser } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";
import type { ToolType } from '../../types/tools.type';

export const ToolBar = () => {
    const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);

    const handleToolChange = (tool: ToolType) => {
        setSelectedTool(tool);
    };

    const onRedo = () => {
        console.log('Redo');
    };

    const onUndo = () => {
        console.log('Undo');
    };
    return (
        <div className={S.Container}>
            <FaArrowRotateLeft size={24} className={S.Button} onClick={onUndo} />
            <FaArrowRotateRight size={24} className={S.Button} onClick={onRedo} />
            <FaPencil size={24} className={S.Button} onClick={() => handleToolChange('pencil')} />
            <FaPenRuler size={24} className={S.Button} onClick={() => handleToolChange('brush')} />
            <FaEraser size={28} className={S.Button} onClick={() => handleToolChange('eraser')} />
        </div>
    );
}