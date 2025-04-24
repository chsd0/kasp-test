import { FC, ReactNode, useContext, useState } from 'react';
import { Typography, Tag, Flex } from 'antd';
import { NewsCtx } from '../NewsCard';
import ShowMoreIcon from '@assets/show-more.svg?react';
import styles from '../styles/NewsCard.module.scss';

export const Content: FC = () => {
    const newsCtx = useContext(NewsCtx);
    if(!newsCtx) {
        return;
    } 

    const { HIGHLIGHTS, AB } = newsCtx;
    
    const nodeArr = prepareHighligths(HIGHLIGHTS);

    const [isCollapsed, setCollapsed] = useState<boolean>(true);

    return (
        <>  
            <Typography.Paragraph className={styles['content'] + (isCollapsed ? '' : ' ' + styles['active'])}>
                {isCollapsed ? nodeArr.map(node => node) : AB}
            </Typography.Paragraph>
            <Flex gap='5px' className={styles['content__show-more-block']} onClick={() => setCollapsed(!isCollapsed)}>
                <Typography.Text className={styles['content__show-more']}>Show more </Typography.Text> 
                <ShowMoreIcon className={styles['content__show-more-icon'] + 
                    (isCollapsed ? '' : ' ' + styles['not-collapsed'])}
                />
            </Flex>
        </>
    )
}

const prepareHighligths = (HIGHLIGHTS: string[] | string): ReactNode[] => {
    let text;
    if(typeof HIGHLIGHTS !== 'string'){
        text = HIGHLIGHTS.reduce((acc, highlight, idx) => {
            return acc + highlight + (idx === HIGHLIGHTS.length - 1 ? '' : '; ');
        }, '');
    } else {
        text = HIGHLIGHTS;
    }

    const textArr = text.split(' ');
    const newArr: string[] = [];
    let currStr = '';
    let carry: string | undefined;
    for(let word of textArr) {
        if(word.slice(0, 4) !== '<kw>') {
            currStr += word + ' ';
        } else {
            if(word.slice(word.length - 2, word.length) === '…;') {
                word = word.slice(0, word.length - 2);
                carry = '…; ';
            }

            if(currStr){
                newArr.push(currStr, word);
            } else {
                newArr.push(word);
            }

            if(carry) {
                currStr = carry;
                carry = undefined;
            } else {
                currStr = '';
            }
        }
    }
    newArr.push(currStr);
    const nodeArr: ReactNode[] = newArr.map((text, idx) => {
        if(text.slice(0, 4) === '<kw>') {
            let doesntHaveMargin = false;
            if(newArr[idx + 1]?.slice(0, 1) === '…') {
                doesntHaveMargin = true;
            }
            return <Tag className={styles['content__key-word' + (doesntHaveMargin ? '-no-margin' : '')]} color='#0087f7' key={idx}>{text.slice(4, text.length - 5)}</Tag>
        }
        return <Typography.Text className={styles['content__text']} key={idx}>{text}</Typography.Text>
    });
    return nodeArr;
}
