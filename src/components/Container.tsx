'use client'

import { Flex } from '@vkontakte/vkui';

import React, { PropsWithChildren } from 'react';

const Container = (props: PropsWithChildren) => {
    return (
        <Flex justify="center" className="px-2 md:px-0">
            <div className="max-w-[840px] w-full">
                {props.children}
            </div>
        </Flex>
    );
};

export default Container;
