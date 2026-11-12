import React, { Component } from 'react';
import { withTheme } from '@emotion/react';
import { StyledImprintDiv, StyledImprintText, StyledLinkH5 } from 'styledComponents/styledComponents';

class License extends Component {
    render() {
        const { theme } = this.props;
        return (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <StyledImprintDiv>
                    <h3 style={{ textAlign: 'center', color: theme.palette.text.primary, fontWeight: 'bold', paddingBottom: '2%' }}>
                        License of VDST
                    </h3>
                    <StyledImprintText>
                        MIT License <br /> <br />
                        Copyright (c) 2025 TIB Hannover / VDST Project <br /> <br />
                        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
                        files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
                        modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
                        is furnished to do so, subject to the following conditions: <br /> <br />
                        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.{' '}
                        <br /> <br />
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                        WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                        COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
                        ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                    </StyledImprintText>
                </StyledImprintDiv>
            </div>
        );
    }
}

export default withTheme(License);
