// src/components/SvgIcon.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const svgContext = require.context('../assets/icons', false, /\.svg$/);

const SvgIcon = ({ icon, className, ...rest }) => {
    const [SvgComponent, setSvgComponent] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadSvg = () => {
            if (!icon) {
                setSvgComponent(null);
                setError(false);
                return;
            }

            try {
                const module = svgContext(`./${icon}.svg`);

                /* // --- 重点在这里，请观察控制台输出 ---
                console.log(`[DEBUG] Loading SVG: ${icon}.svg`);
                console.log(`[DEBUG] Raw module object:`, module);
                console.log(`[DEBUG] typeof module.ReactComponent:`, typeof module.ReactComponent);
                console.log(`[DEBUG] typeof module.default:`, typeof module.default);
                // ------------------------------------ */

                if (module.ReactComponent) {
                    setSvgComponent(() => module.ReactComponent);
                } else if (module.default) {
                    if (typeof module.default === 'function' || (typeof module.default === 'object' && module.default !== null && typeof module.default.render === 'function')) {
                        setSvgComponent(() => module.default);
                    } else {
                        console.error(`[ERROR] module.default 存在但不是一个有效的 React 组件: ${icon}.svg`, module.default);
                        setSvgComponent(null);
                        setError(true);
                    }
                } else {
                    console.error(`[ERROR] 无法识别的 SVG 导出格式或未找到 ReactComponent/default 导出: ${icon}.svg`, module);
                    setSvgComponent(null);
                    setError(true);
                }
                setError(false);
            } catch (err) {
                console.error(`[ERROR] 无法加载 SVG 图标（可能文件不存在或 require.context 错误）: ${icon}.svg`, err);
                setSvgComponent(null);
                setError(true);
            }
        };

        loadSvg();
    }, [icon]);

    if (error) {
        return (
            <div className={`svg-icon-error ${className || ''}`} {...rest} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', borderRadius: '4px', border: '1px dashed #ccc', color: '#888', fontSize: '12px', padding: '4px 8px' }}>
                SVG Not Found: {icon}
            </div>
        );
    }

    if (!SvgComponent) {
        return (
            <div className={`svg-icon-loading ${className || ''}`} {...rest} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', borderRadius: '4px', border: '1px solid #ddd', padding: '4px 8px', color: '#aaa' }}>
                Loading SVG...
            </div>
        );
    }

    return <SvgComponent className={className} {...rest} />;
};

SvgIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default SvgIcon;